"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { itemCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
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
            {user ? (
              <div className="relative group hidden md:block">
                <button className="hover:text-emerald-600 transition-colors flex items-center">
                  <User className="w-4 h-4" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-card-bg border border-zinc-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  <div className="px-4 py-2 border-b border-zinc-100 text-xs text-zinc-500 truncate">
                    {user.email}
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-50 transition-colors text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden md:block hover:text-emerald-600 transition-colors">
                <User className="w-4 h-4" />
              </Link>
            )}
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
            
            <div className="pt-6 border-t border-zinc-100 flex flex-col space-y-6">
              {user ? (
                <>
                  <div className="text-xs text-zinc-500 normal-case tracking-normal font-normal">{user.email}</div>
                  <button 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="text-left text-red-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
