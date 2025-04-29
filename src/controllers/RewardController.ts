import { Request, Response } from 'express';
import { RewardModel, Reward } from '../models/Reward';
import { AuthRequest } from '../middleware/auth';

export class RewardController {
  // Get user rewards
  static async getUserRewards(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const rewards = await RewardModel.findByUserId(userId);
      res.json(rewards);
    } catch (error) {
      console.error('Error getting rewards:', error);
      res.status(500).json({ error: 'Error getting rewards' });
    }
  }

  // Create new reward
  static async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const rewardData: Omit<Reward, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = req.body;
      const reward = await RewardModel.create({
        ...rewardData,
        userId
      });
      res.status(201).json(reward);
    } catch (error) {
      console.error('Error creating reward:', error);
      res.status(500).json({ error: 'Error creating reward' });
    }
  }

  // Update reward status
  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await RewardModel.updateStatus(Number(id), status);
      res.json({ message: 'Reward status updated successfully' });
    } catch (error) {
      console.error('Error updating reward status:', error);
      res.status(500).json({ error: 'Error updating reward status' });
    }
  }

  // Get reward statistics
  static async getStats(req: Request, res: Response) {
    try {
      const stats = await RewardModel.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Error getting statistics:', error);
      res.status(500).json({ error: 'Error getting statistics' });
    }
  }
} 