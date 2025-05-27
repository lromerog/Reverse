import { getDatabase } from '../config/database';
import bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  points?: number;
  level?: string;
  created_at?: string;
}

export class UserModel {
  // Crear un nuevo usuario
  static async create(user: User): Promise<User> {
    const db = await getDatabase();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    const result = await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, hashedPassword]
    );
    
    return { ...user, id: result.lastID };
  }

  // Obtener usuario por email
  static async findByEmail(email: string): Promise<User | null> {
    const db = await getDatabase();
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    return user || null;
  }

  // Obtener usuario por ID
  static async findById(id: number): Promise<User | null> {
    const db = await getDatabase();
    const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    return user || null;
  }

  // Actualizar puntos del usuario
  static async updatePoints(id: number, points: number): Promise<void> {
    const db = await getDatabase();
    await db.run('UPDATE users SET points = points + ? WHERE id = ?', [points, id]);
    
    // Actualizar nivel basado en puntos
    const user = await this.findById(id);
    if (user) {
      let level = 'Principiante';
      const points = user.points ?? 0;
      if (points >= 5000) level = 'Diamante';
      else if (points >= 2000) level = 'Oro';
      else if (points >= 1000) level = 'Plata';
      else if (points >= 500) level = 'Bronce';
      
      await db.run('UPDATE users SET level = ? WHERE id = ?', [level, id]);
    }
  }

  // Verificar contraseña
  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  // Obtener historial de pedidos
  static async getOrderHistory(id: number) {
    const db = await getDatabase();
    return await db.all(`
      SELECT o.*, oi.quantity, p.name as product_name, p.price
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `, [id]);
  }

  // Obtener recompensas canjeadas
  static async getRedeemedRewards(id: number) {
    const db = await getDatabase();
    return await db.all(`
      SELECT r.*, ur.redeemed_at
      FROM rewards r
      JOIN user_rewards ur ON r.id = ur.reward_id
      WHERE ur.user_id = ?
      ORDER BY ur.redeemed_at DESC
    `, [id]);
  }
} 