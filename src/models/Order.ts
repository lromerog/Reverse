import { getDatabase } from '../config/database';

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id?: number;
  user_id: number;
  total: number;
  status: string;
  created_at?: string;
  items?: OrderItem[];
}

export class OrderModel {
  // Crear un nuevo pedido
  static async create(order: Order): Promise<Order> {
    const db = await getDatabase();
    
    // Iniciar transacción
    await db.run('BEGIN TRANSACTION');

    try {
      // Crear el pedido
      const result = await db.run(
        'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
        [order.user_id, order.total, order.status]
      );

      const orderId = result.lastID;

      // Agregar los items del pedido
      if (order.items) {
        for (const item of order.items) {
          await db.run(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
            [orderId, item.product_id, item.quantity, item.price]
          );
        }
      }

      await db.run('COMMIT');
      return { ...order, id: orderId };
    } catch (error) {
      await db.run('ROLLBACK');
      throw error;
    }
  }

  // Obtener pedido por ID
  static async findById(id: number): Promise<Order | null> {
    const db = await getDatabase();
    const order = await db.get('SELECT * FROM orders WHERE id = ?', [id]);
    
    if (!order) return null;

    // Obtener los items del pedido
    const items = await db.all(`
      SELECT oi.*, p.name as product_name
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [id]);

    return { ...order, items };
  }

  // Obtener pedidos de un usuario
  static async findByUserId(userId: number): Promise<Order[]> {
    const db = await getDatabase();
    const orders = await db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    
    // Obtener los items para cada pedido
    for (const order of orders) {
      const items = await db.all(`
        SELECT oi.*, p.name as product_name
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `, [order.id]);
      order.items = items;
    }

    return orders;
  }

  // Actualizar estado del pedido
  static async updateStatus(id: number, status: string): Promise<void> {
    const db = await getDatabase();
    await db.run('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
  }

  // Obtener todos los pedidos (para administradores)
  static async findAll(): Promise<Order[]> {
    const db = await getDatabase();
    const orders = await db.all('SELECT * FROM orders ORDER BY created_at DESC');
    
    // Obtener los items para cada pedido
    for (const order of orders) {
      const items = await db.all(`
        SELECT oi.*, p.name as product_name
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `, [order.id]);
      order.items = items;
    }

    return orders;
  }

  // Obtener estadísticas de pedidos
  static async getStats(): Promise<any> {
    const db = await getDatabase();
    const stats = await db.get(`
      SELECT 
        COUNT(*) as total_orders,
        SUM(total) as total_revenue,
        AVG(total) as average_order_value
      FROM orders
      WHERE status != 'cancelled'
    `);
    return stats;
  }
} 