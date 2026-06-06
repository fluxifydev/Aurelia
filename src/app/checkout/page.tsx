"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    const formData = new FormData(formRef.current);
    const email = formData.get("email");
    const phone = formData.get("phone");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const address = formData.get("address");
    const city = formData.get("city");
    const postalCode = formData.get("postalCode");

    let message = `*New Order - Aurelia Jewels*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${firstName} ${lastName}\n`;
    message += `Email: ${email}\n`;
    message += `Phone: ${phone}\n`;
    message += `Address: ${address}, ${city}, ${postalCode}\n\n`;
    
    message += `*Order Items:*\n`;
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (SKU: ${item.sku})\n`;
      message += `  Size: ${item.selectedSize || 'N/A'}, Price: $${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n*Total Estimate:* $${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n\n`;
    message += `Visit us again at: https://aurelia-alpha.vercel.app/`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919207842646?text=${encodedMessage}`;

    setOrderPlaced(true);
    clearCart();

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
  };

  if (!isClient) return null;

  if (orderPlaced) {
    return (
      <ProtectedRoute>
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <CheckCircle className="w-20 h-20 text-emerald-500 mb-6" />
        <h1 className="font-serif text-4xl mb-4">Redirecting to WhatsApp...</h1>
        <p className="text-zinc-500 mb-8 max-w-md">
          You are being redirected to WhatsApp to confirm your order details. If nothing happens, <a href="#" onClick={() => window.location.reload()} className="underline text-emerald-600">click here</a> to restart.
        </p>
        <Link 
          href="/shop" 
          className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors"
        >
          Continue Shopping
        </Link>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex-1 max-w-7xl mx-auto px-6 py-24 w-full">
        <h1 className="font-serif text-3xl md:text-4xl mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Checkout Form */}
        <div className="flex-1 space-y-12">
          <form id="checkout-form" ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            {/* Contact */}
            <section>
              <h2 className="text-sm font-semibold tracking-widest uppercase mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  name="email"
                  type="email" 
                  required 
                  placeholder="Email Address" 
                  className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 p-3 outline-none focus:border-emerald-500 transition-colors text-[#d4af37]"
                />
                <input 
                  name="phone"
                  type="tel" 
                  required 
                  placeholder="Phone Number" 
                  className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 p-3 outline-none focus:border-emerald-500 transition-colors text-[#d4af37]"
                />
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="text-sm font-semibold tracking-widest uppercase mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input name="firstName" required type="text" placeholder="First Name" className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 p-3 outline-none focus:border-emerald-500 transition-colors text-[#d4af37]" />
                <input name="lastName" required type="text" placeholder="Last Name" className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 p-3 outline-none focus:border-emerald-500 transition-colors text-[#d4af37]" />
                <input name="address" required type="text" placeholder="Address" className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 p-3 outline-none focus:border-emerald-500 transition-colors text-[#d4af37] col-span-2" />
                <input name="city" required type="text" placeholder="City" className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 p-3 outline-none focus:border-emerald-500 transition-colors text-[#d4af37]" />
                <input name="postalCode" required type="text" placeholder="Postal Code" className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 p-3 outline-none focus:border-emerald-500 transition-colors text-[#d4af37]" />
              </div>
            </section>
            
            <p className="text-sm text-zinc-500 mt-4 italic">Note: By placing this order, you will be redirected to WhatsApp to finalize the transaction directly with our support team.</p>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[450px]">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 border border-zinc-200 dark:border-zinc-800 sticky top-32">
            <h2 className="text-sm font-semibold tracking-widest uppercase mb-6">Order Summary</h2>
            
            {cart.length === 0 ? (
              <p className="text-zinc-500 text-sm mb-6">Your cart is empty.</p>
            ) : (
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.cartId} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-2 -right-2 bg-zinc-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div>
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-zinc-500 mt-1">{item.selectedSize ? `Size: ${item.selectedSize}` : item.material}</p>
                      </div>
                      <span className="text-sm font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4 text-sm border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Estimated Tax</span>
                <span>${tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-medium border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-4">
                <span>Total</span>
                <span>${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={cart.length === 0}
              className="w-full mt-8 bg-black text-white dark:bg-white dark:text-black py-4 uppercase tracking-widest text-sm font-medium hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
}
