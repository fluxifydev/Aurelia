"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { Gem, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const bestSellers = products.filter(p => p.bestSeller);

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const imageReveal: Variants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full origin-center"
        >
          <Image
            src="/images/hero_jewelry.png"
            alt="Luxury Jewelry"
            fill
            className="object-cover opacity-50"
            priority
          />
        </motion.div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center text-white px-6 w-full max-w-4xl"
        >
          <motion.h1 variants={fadeInUp} className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none mb-6 tracking-tight drop-shadow-2xl">
            AURELIA
          </motion.h1>
          <motion.p variants={fadeInUp} className="font-sans text-sm md:text-base font-light tracking-[0.3em] uppercase mb-12 max-w-2xl mx-auto text-zinc-300">
            Timeless Elegance &bull; Flawless Craftsmanship
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link 
              href="/shop" 
              className="group inline-flex items-center space-x-4 border-b border-white/30 pb-2 hover:border-white transition-colors duration-500"
            >
              <span className="font-semibold tracking-[0.2em] uppercase text-xs">Discover the Collection</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Our Story (Editorial Layout) */}
      <section id="story" className="py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={imageReveal}
            className="md:col-span-5 relative aspect-[3/4] overflow-hidden"
          >
            <Image 
              src="/images/ring_aurum.png" 
              alt="Our Heritage" 
              fill 
              className="object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="md:col-span-7 md:pl-12"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-zinc-500 mb-6">
              Our Heritage
            </motion.h2>
            <motion.h3 variants={fadeInUp} className="font-serif text-5xl md:text-6xl text-foreground mb-10 leading-[1.1]">
              The Story Behind <br />
              <span className="italic text-emerald-800">the Sparkle.</span>
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-zinc-600 text-lg md:text-xl leading-relaxed font-light mb-8 max-w-2xl">
              Founded in the heart of the diamond district, Aurelia Jewels was born out of a profound passion for extraordinary craftsmanship. For over three decades, our master artisans have sourced only the most ethically procured, flawless gemstones from around the world. 
            </motion.p>
            <motion.p variants={fadeInUp} className="text-zinc-600 text-lg md:text-xl leading-relaxed font-light max-w-2xl">
              We don&apos;t just create jewelry; we forge heirlooms that carry your unique story through generations. Our dedication to perfection is woven into every facet, every setting, and every design that leaves our atelier.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-32 px-6 w-full">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-20"
          >
            <div>
              <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-zinc-500 mb-4">Curated Selection</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-foreground">Iconic Pieces</h3>
            </div>
            <Link href="/shop" className="hidden md:inline-flex items-center space-x-2 border-b border-foreground/30 pb-1 hover:border-foreground transition-colors group">
              <span className="text-xs tracking-[0.2em] uppercase font-semibold">View Collection</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
          >
            {bestSellers.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <Link href={`/product/${product.id}`} className="group block">
                  <div className="relative aspect-[4/5] mb-8 bg-white overflow-hidden border border-zinc-100">
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transform transition-transform duration-[1.5s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-2xl mb-2 text-foreground">{product.name}</h3>
                      <p className="text-xs tracking-widest text-zinc-500 uppercase">{product.category}</p>
                    </div>
                    <p className="text-emerald-800 font-medium">${product.price.toLocaleString()}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Offer / Quality */}
      <section id="quality" className="py-32 bg-white px-6 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="md:col-span-6 space-y-10 order-2 md:order-1"
          >
            <div>
              <motion.h2 variants={fadeInUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-zinc-500 mb-6">Uncompromising Quality</motion.h2>
              <motion.h3 variants={fadeInUp} className="font-serif text-5xl md:text-6xl leading-[1.1] text-foreground">
                Masterpieces of <br/><span className="italic text-emerald-800">Timeless Beauty.</span>
              </motion.h3>
            </div>
            <motion.p variants={fadeInUp} className="text-zinc-600 leading-relaxed text-xl font-light">
              Every piece at Aurelia undergoes a rigorous 50-point inspection. We exclusively use internally flawless (IF) to VVS1 diamonds, ensuring unparalleled brilliance. 
            </motion.p>
            <motion.p variants={fadeInUp} className="text-zinc-600 leading-relaxed text-xl font-light">
              Our emeralds are sourced from conflict-free mines in Colombia, renowned for their vivid saturation. Bound in solid 18k gold or platinum, our creations are guaranteed to withstand the test of time.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={imageReveal}
            className="md:col-span-6 relative aspect-[3/4] md:aspect-square order-1 md:order-2 overflow-hidden"
          >
            <Image 
              src="/images/ring_tiara.png" 
              alt="Craftsmanship" 
              fill 
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6 w-full">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-24"
          >
            <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-zinc-500 mb-4">At Your Service</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground">Bespoke Excellence</h3>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { icon: Gem, title: "Custom Design", desc: "Work directly with our master jewelers to bring your dream piece to life from a simple sketch." },
              { icon: Clock, title: "Restoration", desc: "Breathe new life into heirlooms with professional cleaning, polishing, and precise resizing." },
              { icon: ShieldCheck, title: "Valuation", desc: "Receive certified, detailed appraisals for insurance from our in-house gemologists." }
            ].map((service, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="group p-10 border border-zinc-200 hover:border-emerald-800 transition-colors duration-500 bg-white">
                <service.icon className="w-8 h-8 text-emerald-800 mb-8 transform group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-serif text-2xl mb-4 text-foreground">{service.title}</h3>
                <p className="text-zinc-500 font-light text-base leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section id="contact" className="py-32 bg-[#111] text-white px-6 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="md:col-span-7"
          >
            <motion.h2 variants={fadeInUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-500 mb-6">Contact</motion.h2>
            <motion.h3 variants={fadeInUp} className="font-serif text-4xl md:text-6xl mb-10 leading-tight">Visit Our <br/><span className="italic">Boutique.</span></motion.h3>
            <motion.p variants={fadeInUp} className="text-zinc-400 font-light text-lg md:text-xl leading-relaxed mb-16 max-w-lg">
              Experience the brilliance of our collections in person. Book a private consultation with our diamond experts.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="font-semibold uppercase tracking-[0.2em] text-xs text-zinc-500">Location</h4>
                <p className="text-zinc-300 font-light leading-relaxed">123 Luxury Avenue, Suite 400<br/>New York, NY 10022</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold uppercase tracking-[0.2em] text-xs text-zinc-500">Contact</h4>
                <p className="text-zinc-300 font-light leading-relaxed">+91 9207842646<br/>concierge@aureliajewels.com</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="md:col-span-5 bg-[#1a1a1a] p-12 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-serif text-3xl mb-10">Opening Hours</h3>
              <ul className="space-y-6 text-zinc-400 font-light">
                <li className="flex justify-between border-b border-zinc-800 pb-4">
                  <span>Mon - Fri</span>
                  <span>10:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-zinc-800 pb-4">
                  <span>Saturday</span>
                  <span>11:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Appointments Only</span>
                </li>
              </ul>
            </div>
            
            <a 
              href="https://wa.me/919207842646?text=Hello,%20I%20would%20like%20to%20book%20a%20private%20consultation." 
              className="mt-16 block w-full border border-emerald-600 text-center py-5 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-500"
            >
              Book via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
