import Link from 'next/link';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: "Nike Air Zoom Pegasus 40", description: "Run faster, run farther.", price: "129.99", image: "/Products/nike-just-do-it(6).png", category: "Running", colors: ["white", "black", "red"] },
  { id: 2, name: "Nike Air Force 1 '07", description: "The basketball icon reinvented.", price: "109.99", image: "/Products/nike-just-do-it(3).jpg", category: "Lifestyle", colors: ["white", "black"] },
  { id: 3, name: "Nike Dunk Low", description: "The skateboarding classic.", price: "99.99", image: "/Products/nike-just-do-it(12).png", category: "Skateboarding", colors: ["green", "white"] },
  { id: 4, name: "Nike Motiva", description: "Comfort for every step.", price: "89.99", image: "/Products/WMNS+NIKE+MOTIVA.avif", category: "Walking", colors: ["white", "pink"] },
  { id: 5, name: "Nike Club Cap", description: "Classic style, everyday comfort.", price: "29.99", image: "/Products/U+NK+CLUB+CAP+U+CB+SM+SWSH+L.avif", category: "Accessories", colors: ["black", "white"] },
  { id: 6, name: "Nike Aura Waistpack", description: "Carry your essentials in style.", price: "39.99", image: "/Products/NK+AURA+WAISTPACK.avif", category: "Accessories", colors: ["black", "gray"] },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link
            href="/featured"
            className="text-sm font-semibold text-gray-600 hover:text-black"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
} 