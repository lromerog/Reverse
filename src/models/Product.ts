import { getDatabase } from '../config/database';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  points: number;
  created_at?: string;
}

export class ProductModel {
  // Crear un nuevo producto
  static async create(product: Product): Promise<Product> {
    const db = await getDatabase();
    const result = await db.run(
      'INSERT INTO products (name, description, price, image, category, points) VALUES (?, ?, ?, ?, ?, ?)',
      [product.name, product.description, product.price, product.image, product.category, product.points]
    );
    return { ...product, id: result.lastID };
  }

  // Obtener todos los productos
  static async findAll(): Promise<Product[]> {
    const db = await getDatabase();
    return await db.all('SELECT * FROM products ORDER BY created_at DESC');
  }

  // Obtener producto por ID
  static async findById(id: number): Promise<Product | null> {
    const db = await getDatabase();
    const product = await db.get('SELECT * FROM products WHERE id = ?', [id]);
    return product || null;
  }

  // Obtener productos por categoría
  static async findByCategory(category: string): Promise<Product[]> {
    const db = await getDatabase();
    return await db.all('SELECT * FROM products WHERE category = ? ORDER BY created_at DESC', [category]);
  }

  // Buscar productos
  static async search(query: string): Promise<Product[]> {
    const db = await getDatabase();
    return await db.all(
      'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY created_at DESC',
      [`%${query}%`, `%${query}%`]
    );
  }

  // Actualizar producto
  static async update(id: number, product: Partial<Product>): Promise<void> {
    const db = await getDatabase();
    const updates = Object.entries(product)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => `${key} = ?`);
    
    if (updates.length === 0) return;

    const values = Object.entries(product)
      .filter(([_, value]) => value !== undefined)
      .map(([_, value]) => value);

    await db.run(
      `UPDATE products SET ${updates.join(', ')} WHERE id = ?`,
      [...values, id]
    );
  }

  // Eliminar producto
  static async delete(id: number): Promise<void> {
    const db = await getDatabase();
    await db.run('DELETE FROM products WHERE id = ?', [id]);
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