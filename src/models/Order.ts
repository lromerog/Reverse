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
  private static orders: Order[] = [];

  static async findByUserId(userId: number): Promise<Order[]> {
    return this.orders.filter(order => order.userId === userId);
  }

  static async create(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const newOrder: Order = {
      id: this.orders.length + 1,
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  static async updateStatus(id: number, status: Order['status']): Promise<void> {
    const index = this.orders.findIndex(order => order.id === id);
    if (index !== -1) {
      this.orders[index] = {
        ...this.orders[index],
        status,
        updatedAt: new Date()
      };
    }
  }

  static async getStats(): Promise<{
    total: number;
    byStatus: Record<Order['status'], number>;
    averageOrderValue: number;
  }> {
    const total = this.orders.length;
    const byStatus = this.orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<Order['status'], number>);
    const averageOrderValue = total > 0 
      ? this.orders.reduce((sum, order) => sum + order.total, 0) / total 
      : 0;

    return {
      total,
      byStatus,
      averageOrderValue
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