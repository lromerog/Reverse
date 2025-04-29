import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getProductById: (id: number) => Product | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock products data
const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    price: 150,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    category: 'Men\'s Shoes',
    description: 'The Nike Air Max 270 delivers visible cushioning under every step with a large window and plush feel.'
  },
  {
    id: 2,
    name: 'Nike Air Force 1',
    price: 100,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-665455a5-47de-40fb-945f-c1852b82400d/air-force-1-07-mens-shoes-5QFp5Z.png',
    category: 'Men\'s Shoes',
    description: 'The radiance lives on in the Nike Air Force 1, the basketball original that puts a fresh spin on what you know best.'
  },
  {
    id: 3,
    name: 'Nike Dunk Low',
    price: 110,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5fe30b38-8f64-467b-b513-3a3e3b1d9b9a/dunk-low-mens-shoes-86f1lq.png',
    category: 'Men\'s Shoes',
    description: 'Created for the hardwood but taken to the streets, the Nike Dunk Low returns with crisp overlays and original team colors.'
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getProductById
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 