import { getDatabase } from '../config/database';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductModel {
  private static products: Product[] = [];

  static async findAll(): Promise<Product[]> {
    return this.products;
  }

  static async findById(id: number): Promise<Product | null> {
    return this.products.find(product => product.id === id) || null;
  }

  static async findByCategory(category: string): Promise<Product[]> {
    return this.products.filter(product => product.category === category);
  }

  static async search(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  static async create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const newProduct: Product = {
      id: this.products.length + 1,
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.push(newProduct);
    return newProduct;
  }

  static async update(id: number, productData: Partial<Product>): Promise<void> {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...productData,
        updatedAt: new Date()
      };
    }
  }

  static async delete(id: number): Promise<void> {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  // Obtener productos relacionados
  static async getRelatedProducts(id: number, category: string): Promise<Product[]> {
    const db = await getDatabase();
    return await db.all(
      'SELECT * FROM products WHERE category = ? AND id != ? ORDER BY created_at DESC LIMIT 3',
      [category, id]
    );
  }
} 