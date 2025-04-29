import { getDatabase } from '../config/database';

export interface Reward {
  id?: number;
  name: string;
  description: string;
  points: number;
  image: string;
  created_at?: string;
}

export class RewardModel {
  // Crear una nueva recompensa
  static async create(reward: Reward): Promise<Reward> {
    const db = await getDatabase();
    const result = await db.run(
      'INSERT INTO rewards (name, description, points, image) VALUES (?, ?, ?, ?)',
      [reward.name, reward.description, reward.points, reward.image]
    );
    return { ...reward, id: result.lastID };
  }

  // Obtener todas las recompensas
  static async findAll(): Promise<Reward[]> {
    const db = await getDatabase();
    return await db.all('SELECT * FROM rewards ORDER BY points ASC');
  }

  // Obtener recompensa por ID
  static async findById(id: number): Promise<Reward | null> {
    const db = await getDatabase();
    const reward = await db.get('SELECT * FROM rewards WHERE id = ?', [id]);
    return reward || null;
  }

  // Canjear recompensa
  static async redeem(userId: number, rewardId: number): Promise<boolean> {
    const db = await getDatabase();
    
    // Verificar si el usuario tiene suficientes puntos
    const user = await db.get('SELECT points FROM users WHERE id = ?', [userId]);
    const reward = await db.get('SELECT points FROM rewards WHERE id = ?', [rewardId]);
    
    if (!user || !reward || user.points < reward.points) {
      return false;
    }

    // Iniciar transacción
    await db.run('BEGIN TRANSACTION');

    try {
      // Descontar puntos al usuario
      await db.run(
        'UPDATE users SET points = points - ? WHERE id = ?',
        [reward.points, userId]
      );

      // Registrar la recompensa canjeada
      await db.run(
        'INSERT INTO user_rewards (user_id, reward_id) VALUES (?, ?)',
        [userId, rewardId]
      );

      await db.run('COMMIT');
      return true;
    } catch (error) {
      await db.run('ROLLBACK');
      throw error;
    }
  }

  // Obtener recompensas disponibles para un usuario
  static async getAvailableRewards(userId: number): Promise<Reward[]> {
    const db = await getDatabase();
    const user = await db.get('SELECT points FROM users WHERE id = ?', [userId]);
    
    if (!user) return [];

    return await db.all(
      'SELECT * FROM rewards WHERE points <= ? ORDER BY points ASC',
      [user.points]
    );
  }

  // Obtener recompensas canjeadas por un usuario
  static async getRedeemedRewards(userId: number): Promise<Reward[]> {
    const db = await getDatabase();
    return await db.all(`
      SELECT r.*, ur.redeemed_at
      FROM rewards r
      JOIN user_rewards ur ON r.id = ur.reward_id
      WHERE ur.user_id = ?
      ORDER BY ur.redeemed_at DESC
    `, [userId]);
  }

  // Actualizar recompensa
  static async update(id: number, reward: Partial<Reward>): Promise<void> {
    const db = await getDatabase();
    const updates = Object.entries(reward)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => `${key} = ?`);
    
    if (updates.length === 0) return;

    const values = Object.entries(reward)
      .filter(([_, value]) => value !== undefined)
      .map(([_, value]) => value);

    await db.run(
      `UPDATE rewards SET ${updates.join(', ')} WHERE id = ?`,
      [...values, id]
    );
  }

  // Eliminar recompensa
  static async delete(id: number): Promise<void> {
    const db = await getDatabase();
    await db.run('DELETE FROM rewards WHERE id = ?', [id]);
  }
} 