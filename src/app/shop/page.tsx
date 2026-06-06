"use client";

import { products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");
  
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryQuery || "All");
  const [sort, setSort] = useState("featured");

  const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, selectedCategory, sort]);

  return (
    <div className="flex-1 max-w-7xl mx-auto px-6 py-32 w-full">
      <div className="flex justify-between items-end mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="font-serif text-4xl mb-2">The Collection</h1>
          <p className="text-zinc-500 text-sm tracking-widest uppercase">{filteredProducts.length} Results</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 space-y-10 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search jewelry..." 
                className="w-full text-sm border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-2 outline-none focus:border-emerald-500 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 font-semibold tracking-widest uppercase text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Category</span>
            </div>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className={`hover:text-emerald-500 transition-colors ${selectedCategory === cat ? 'text-emerald-600 font-medium' : ''}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 font-semibold tracking-widest uppercase text-sm">
              <span>Sort By</span>
            </div>
            <select 
              className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 py-2 px-3 text-sm outline-none focus:border-emerald-500"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-500">No products found matching your criteria.</p>
              <button 
                onClick={() => {setSearch(""); setSelectedCategory("All");}}
                className="mt-4 border-b border-foreground text-sm tracking-widest uppercase"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <Link 
                  href={`/product/${product.id}`} 
                  key={product.id}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] mb-4 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-1">{product.name}</h3>
                    <p className="text-gold-700 dark:text-gold-400 text-sm font-medium">${product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
