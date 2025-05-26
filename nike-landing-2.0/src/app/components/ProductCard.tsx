import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  colors: string[];
}

export default function ProductCard({ id, name, description, price, image, category, colors }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/product/${id}`} className="block">
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <p className="mt-2 text-sm font-bold text-gray-900">${price}</p>
          <p className="mt-1 text-xs text-gray-500">Category: {category}</p>
          <div className="mt-2 flex gap-1">
            {colors.map((color) => (
              <span key={color} className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
} 