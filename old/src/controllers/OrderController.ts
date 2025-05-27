import { Request, Response } from 'express';
import { OrderModel, Order } from '../models/Order';
import { AuthRequest } from '../middleware/auth';

export class OrderController {
  // Get user orders
  static async getUserOrders(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const orders = await OrderModel.findByUserId(userId);
      res.json(orders);
    } catch (error) {
      console.error('Error getting orders:', error);
      res.status(500).json({ error: 'Error getting orders' });
    }
  }

  // Create new order
  static async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const orderData: Omit<Order, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = req.body;
      const order = await OrderModel.create({
        ...orderData,
        userId
      });
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Error creating order' });
    }
  }

  // Update order status
  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await OrderModel.updateStatus(Number(id), status);
      res.json({ message: 'Order status updated successfully' });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Error updating order status' });
    }
  }

  // Get order statistics
  static async getStats(req: Request, res: Response) {
    try {
      const stats = await OrderModel.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Error getting statistics:', error);
      res.status(500).json({ error: 'Error getting statistics' });
    }
  }
} 