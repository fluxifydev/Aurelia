"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { itemCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed w-full z-40 transition-all duration-700 ${
          isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-zinc-200/50 py-4" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-8 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Links - Left */}
          <div className="hidden lg:flex items-center space-x-6 text-xs font-semibold tracking-widest uppercase">
            <Link href="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
            <Link href="/#story" className="hover:text-emerald-600 transition-colors">Our Story</Link>
            <Link href="/#services" className="hover:text-emerald-600 transition-colors">Services</Link>
            <Link href="/#guarantee" className="hover:text-emerald-600 transition-colors">Guarantee</Link>
            <Link href="/#contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
          </div>

          {/* Logo - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="font-serif text-2xl tracking-widest font-semibold uppercase">
              Aurelia
            </Link>
          </div>

          {/* Desktop Links & Icons - Right */}
          <div className="flex items-center space-x-6 text-foreground">
            <button className="hidden md:block hover:text-emerald-600 transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="hidden md:block hover:text-emerald-600 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button 
              className="relative hover:text-emerald-600 transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col p-6 lg:hidden">
          <div className="flex justify-between items-center mb-12">
            <Link href="/" className="font-serif text-2xl tracking-widest font-semibold uppercase">
              Aurelia
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-6 text-lg uppercase tracking-widest font-semibold">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link href="/#story" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
            <Link href="/#quality" onClick={() => setIsMobileMenuOpen(false)}>Quality</Link>
            <Link href="/#services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
            <Link href="/#guarantee" onClick={() => setIsMobileMenuOpen(false)}>Guarantee</Link>
            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Info</Link>
          </div>
        </div>
      )}
    </>
  );
}
