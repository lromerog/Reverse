import { getDatabase } from '../config/database';

export interface Reward {
  id: number;
  userId: number;
  points: number;
  type: 'purchase' | 'referral' | 'bonus';
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export class RewardModel {
  private static rewards: Reward[] = [];

  static async findByUserId(userId: number): Promise<Reward[]> {
    return this.rewards.filter(reward => reward.userId === userId);
  }

  static async create(rewardData: Omit<Reward, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reward> {
    const newReward: Reward = {
      id: this.rewards.length + 1,
      ...rewardData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.rewards.push(newReward);
    return newReward;
  }

  static async updateStatus(id: number, status: Reward['status']): Promise<void> {
    const index = this.rewards.findIndex(reward => reward.id === id);
    if (index !== -1) {
      this.rewards[index] = {
        ...this.rewards[index],
        status,
        updatedAt: new Date()
      };
    }
  }

  static async getStats(): Promise<{
    total: number;
    byType: Record<Reward['type'], number>;
    byStatus: Record<Reward['status'], number>;
    totalPoints: number;
  }> {
    const total = this.rewards.length;
    const byType = this.rewards.reduce((acc, reward) => {
      acc[reward.type] = (acc[reward.type] || 0) + 1;
      return acc;
    }, {} as Record<Reward['type'], number>);
    const byStatus = this.rewards.reduce((acc, reward) => {
      acc[reward.status] = (acc[reward.status] || 0) + 1;
      return acc;
    }, {} as Record<Reward['status'], number>);
    const totalPoints = this.rewards.reduce((sum, reward) => sum + reward.points, 0);

    return {
      total,
      byType,
      byStatus,
      totalPoints
    };
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