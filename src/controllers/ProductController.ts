import { Request, Response } from 'express';
import { ProductModel, Product } from '../models/Product';

export class ProductController {
  // Get all products
  static async getAll(req: Request, res: Response) {
    try {
      const products = await ProductModel.findAll();
      res.json(products);
    } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ error: 'Error getting products' });
    }
  }

  // Get product by ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(Number(id));
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      console.error('Error getting product:', error);
      res.status(500).json({ error: 'Error getting product' });
    }
  }

  // Get products by category
  static async getByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;
      const products = await ProductModel.findByCategory(category);
      res.json(products);
    } catch (error) {
      console.error('Error getting products by category:', error);
      res.status(500).json({ error: 'Error getting products by category' });
    }
  }

  // Search products
  static async search(req: Request, res: Response) {
    try {
      const { query } = req.params;
      const products = await ProductModel.search(query);
      res.json(products);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'Error searching products' });
    }
  }

  // Create new product
  static async create(req: Request, res: Response) {
    try {
      const productData: Product = req.body;
      const product = await ProductModel.create(productData);
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Error creating product' });
    }
  }

  // Update product
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const productData: Partial<Product> = req.body;
      await ProductModel.update(Number(id), productData);
      res.json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Error updating product' });
    }
  }

  // Delete product
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ProductModel.delete(Number(id));
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Error deleting product' });
    }
  }
} 