"use client";

import { products } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find(p => p.id === resolvedParams.id);
  
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!product) {
    notFound();
  }

  // Define size options based on category
  let sizeOptions: string[] = [];
  if (product.category === "Rings") {
    sizeOptions = ["5", "6", "7", "8", "9"];
  } else if (product.category === "Necklaces") {
    sizeOptions = ["16\"", "18\"", "20\""];
  } else if (product.category === "Bracelets") {
    sizeOptions = ["Small", "Medium", "Large"];
  }

  const handleAddToCart = () => {
    if (sizeOptions.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product, quantity, selectedSize || undefined);
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto px-6 py-24 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-zinc-500 mb-12">
        <Link href="/shop" className="hover:text-black dark:hover:text-white transition-colors">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-black dark:hover:text-white transition-colors">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black dark:text-white">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="font-serif text-3xl md:text-5xl mb-4">{product.name}</h1>
          <p className="text-xl text-emerald-600 dark:text-emerald-500 mb-8">${product.price.toLocaleString()}</p>
          
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 py-8">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500 tracking-widest uppercase">Material</span>
              <span className="font-medium">{product.material}</span>
            </div>

            {sizeOptions.length > 0 && (
              <div>
                <div className="flex justify-between items-center text-sm mb-3">
                  <span className="text-zinc-500 tracking-widest uppercase">Size</span>
                  <a href="#" className="underline text-xs">Size Guide</a>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center border text-sm transition-colors ${
                        selectedSize === size 
                          ? 'border-black bg-black text-white dark:bg-white dark:text-black dark:border-white' 
                          : 'border-zinc-300 hover:border-black dark:border-zinc-700 dark:hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <div className="flex items-center border border-zinc-300 dark:border-zinc-700">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white dark:bg-white dark:text-black uppercase tracking-widest text-sm font-medium hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Accordions (Static for demo) */}
          <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
            <details className="group py-4">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm uppercase tracking-widest">
                <span>Details & Care</span>
                <span className="transition group-open:rotate-45">+</span>
              </summary>
              <div className="text-zinc-600 dark:text-zinc-400 mt-4 text-sm leading-relaxed">
                <p>To preserve the beauty of your Aurelia jewelry, store it in the provided pouch or box. Avoid exposure to water, perfume, and harsh chemicals. Clean gently with a soft cloth.</p>
              </div>
            </details>
            <details className="group py-4">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm uppercase tracking-widest">
                <span>Shipping & Returns</span>
                <span className="transition group-open:rotate-45">+</span>
              </summary>
              <div className="text-zinc-600 dark:text-zinc-400 mt-4 text-sm leading-relaxed">
                <p>Complimentary express shipping on all orders. Returns are accepted within 30 days of delivery in original, unworn condition.</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
