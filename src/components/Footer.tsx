import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-zinc-600 py-16 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Newsletter */}
        <div className="md:col-span-1 space-y-6">
          <Link href="/" className="font-serif text-2xl tracking-widest font-semibold uppercase text-emerald-900">
            Aurelia
          </Link>
          <p className="text-sm text-zinc-500">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form className="relative border-b border-zinc-300 focus-within:border-emerald-500 transition-colors">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="w-full bg-transparent py-2 pr-10 text-sm outline-none text-zinc-900 placeholder-zinc-400"
            />
            <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-emerald-500 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <div className="flex space-x-4 pt-4">
            <a href="#" className="hover:text-emerald-500 transition-colors"><Mail className="w-5 h-5" /></a>
            <a href="#" className="hover:text-emerald-500 transition-colors"><Phone className="w-5 h-5" /></a>
            <a href="#" className="hover:text-emerald-500 transition-colors"><MapPin className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Shop Links */}
        <div className="space-y-4">
          <h4 className="text-emerald-900 text-sm font-semibold uppercase tracking-widest">Shop</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/shop" className="hover:text-emerald-600 transition-colors">All Jewelry</Link></li>
            <li><Link href="/shop" className="hover:text-emerald-600 transition-colors">Rings</Link></li>
            <li><Link href="/shop" className="hover:text-emerald-600 transition-colors">Necklaces</Link></li>
            <li><Link href="/shop" className="hover:text-emerald-600 transition-colors">Earrings</Link></li>
            <li><Link href="/shop" className="hover:text-emerald-600 transition-colors">Bracelets</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-4">
          <h4 className="text-emerald-900 text-sm font-semibold uppercase tracking-widest">Customer Care</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Ring Sizer</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Jewelry Care</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* About */}
        <div className="space-y-4">
          <h4 className="text-emerald-900 text-sm font-semibold uppercase tracking-widest">About</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Boutiques</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Careers</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400">
        <p>&copy; {new Date().getFullYear()} Aurelia Jewels. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
