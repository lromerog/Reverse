import { getDatabase } from '../config/database';

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  products: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export class OrderModel {
  // Crear un nuevo pedido
  static async create(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    // Aquí puedes implementar la lógica para crear un pedido en la base de datos
    // Por ahora, solo retorna un objeto simulado
    return {
      id: Date.now(),
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  // Actualizar estado del pedido
  static async updateStatus(id: number, status: Order['status']): Promise<void> {
    // Implementa la lógica para actualizar el estado en la base de datos
  }

  // Obtener estadísticas de pedidos
  static async getStats(): Promise<{
    total: number;
    byStatus: Record<Order['status'], number>;
    averageOrderValue: number;
  }> {
    // Implementa la lógica para obtener estadísticas de la base de datos
    return {
      total: 0,
      byStatus: {
        pending: 0,
        processing: 0,
        completed: 0,
        cancelled: 0
      },
      averageOrderValue: 0
    };
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

  // Obtener pedidos de un usuario (única implementación)
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
}