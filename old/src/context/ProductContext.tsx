import React, { createContext, useContext, useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  colors?: string[];
  sizes?: string[];
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Nike Air Max 270',
      price: 150,
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/air-max-270-shoes-KkLcGR.png',
      category: 'Lifestyle',
      description: 'The Nike Air Max 270 delivers visible cushioning under every step with a large window and plush feel.',
      colors: ['Black', 'White', 'Red'],
      sizes: ['7', '8', '9', '10', '11', '12']
    },
    {
      id: '2',
      name: 'Nike Air Force 1',
      price: 100,
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/air-force-1-07-shoes-WrLlWX.png',
      category: 'Lifestyle',
      description: 'The radiance lives on in the Nike Air Force 1, the basketball original that puts a fresh spin on what you know best.',
      colors: ['White', 'Black', 'Blue'],
      sizes: ['7', '8', '9', '10', '11', '12']
    },
    {
      id: '3',
      name: 'Nike ZoomX Vaporfly',
      price: 250,
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/zoomx-vaporfly-next-running-shoe-2p4p4p.png',
      category: 'Running',
      description: 'The Nike ZoomX Vaporfly is the fastest shoe we\'ve ever made.',
      colors: ['Red', 'Black', 'White'],
      sizes: ['7', '8', '9', '10', '11', '12']
    }
  ]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
}; 