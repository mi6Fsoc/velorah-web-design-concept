/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useEffect, useState } from "react";

function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest <= 100) {
      setHidden(false);
    } else if (latest > previous && latest > 200) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        initial: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -50 }
      }}
      initial="initial"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex flex-row items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto mix-blend-difference"
    >
      {/* Left Side Logo */}
      <a href="#home"
        className="text-3xl tracking-tight text-foreground flex items-start select-none" 
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Velorah<sup className="text-xs mt-1">®</sup>
      </a>

      {/* Nav Links */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#home" className="text-sm text-foreground transition-colors">Home</a>
        <a href="#studio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Studio</a>
        <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
        <a href="#journal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Journal</a>
        <a href="#reach-us" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reach Us</a>
      </div>

      {/* CTA Button */}
      <a href="#reach-us" className="liquid-glass hover-glow rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-all duration-300">
        Begin Journey
      </a>
    </motion.nav>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Subtle parallax effect on the video
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={containerRef} id="home" className="relative h-[100dvh] w-full overflow-hidden flex flex-col">
      {/* Video Background */}
      <motion.div 
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where <em className="not-italic text-muted-foreground">dreams</em> rise <em className="not-italic text-muted-foreground">through the silence.</em>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
        >
          We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <a href="#reach-us" className="liquid-glass hover-glow inline-flex rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
            Begin Journey
          </a>
        </motion.div>
      </div>
      
      {/* Light gradient strictly at the bottom of hero for seamless transition to dark content below */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}

function Studio() {
  const services = [
    { name: "Strategy", desc: "Defining the core narrative and position.", video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4" },
    { name: "Design Systems", desc: "Scalable visual languages and components.", video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4" },
    { name: "Product Interfaces", desc: "Intuitive, high-performance applications.", video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_074327_a4d6275d-82d9-4c83-bfbe-f1fb2213c17c.mp4" },
    { name: "Motion Direction", desc: "Purposeful animation that guides and delights.", video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4" }
  ];

  return (
    <section id="studio" className="py-32 px-6 max-w-7xl mx-auto relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
        <div>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-medium uppercase tracking-widest text-muted-foreground/50"
          >
            Studio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-4xl md:text-5xl mt-6 font-normal text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Crafting elegance<br />in the digital void.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-6 text-muted-foreground leading-relaxed max-w-md"
          >
            We believe that restraint is the ultimate form of sophistication. 
            Our approach strips away the non-essential to reveal the true 
            purpose of your product.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service, idx) => (
            <motion.div 
              key={service.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 + 0.1 * idx }}
              className="liquid-glass p-8 rounded-2xl flex items-end min-h-40 hover-glow group relative overflow-hidden"
            >
              <video 
                src={service.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <h3 className="text-lg text-foreground group-hover:text-white transition-colors duration-500">{service.name}</h3>
                <p className="text-sm text-foreground/0 max-h-0 overflow-hidden group-hover:max-h-20 group-hover:text-white/70 group-hover:mt-2 transition-all duration-500 ease-out">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-40 px-6 bg-background relative z-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <video 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover mix-blend-screen"
        />
      </div>
      <div className="absolute inset-0 block bg-black/30 z-0 pointer-events-none backdrop-blur-[1px]" />
      <div className="absolute inset-0 block bg-gradient-to-b from-background via-black/50 to-background z-0 pointer-events-none opacity-80" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-4xl md:text-5xl font-normal leading-tight text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
              “Design is not just what it looks like and feels like. Design is how it works in the quiet moments between interactions.”
            </h3>
            <p className="mt-8 text-muted-foreground/70 text-sm uppercase tracking-widest">
              Our Philosophy
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 text-muted-foreground leading-relaxed text-lg"
          >
            <p>
              Velorah was founded on a simple premise: in an increasingly noisy digital world, clarity is the rarest luxury. We are a collective of designers, thinkers, and technologists dedicated to crafting digital spaces that respect the user's attention.
            </p>
            <p>
              Our mission is to build tools and interfaces that empower deep focus. By stripping away the superfluous, we reveal the essential—creating environments where ideas can breathe and bold work can take shape.
            </p>
            <div className="pt-8 border-t border-border/20 flex gap-12">
              <div>
                <strong className="block text-foreground text-3xl font-normal mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>10+</strong>
                <span className="text-xs uppercase tracking-wider text-muted-foreground/50">Years of Mastery</span>
              </div>
              <div>
                <strong className="block text-foreground text-3xl font-normal mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>0</strong>
                <span className="text-xs uppercase tracking-wider text-muted-foreground/50">Compromises</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Journal() {
  const articles = [
    { cat: "Thoughts", title: "The End of Infinite Scroll", excerpt: "Why finite, curated experiences are returning to luxury digital design.", time: "4 min read", video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4" },
    { cat: "Process", title: "Embracing Negative Space", excerpt: "How silence in layout amplifies the voice of your central message.", time: "6 min read", video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4" },
    { cat: "Case Study", title: "A Study in Monochrome", excerpt: "Building tension through constraints in modern web typography.", time: "8 min read", video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_074327_a4d6275d-82d9-4c83-bfbe-f1fb2213c17c.mp4" },
  ];

  return (
    <section id="journal" className="py-32 px-6 max-w-7xl mx-auto relative z-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground/50">Journal</span>
        <h2 className="text-4xl mt-6 font-normal text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Curated observations.
        </h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <motion.div 
            key={article.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 * idx }}
            className="liquid-glass rounded-2xl p-8 hover-glow group cursor-pointer border border-border/20 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden"
          >
            <video 
              src={article.video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 scale-100 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center text-xs text-muted-foreground/70 mb-6 group-hover:text-white/80 transition-colors duration-500">
                <span className="uppercase tracking-wider">{article.cat}</span>
                <span>{article.time}</span>
              </div>
              <h3 className="text-2xl font-normal text-foreground mb-4 group-hover:text-white transition-colors duration-500" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mt-auto group-hover:text-white/70 transition-colors duration-500">
                {article.excerpt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ReachUs() {
  return (
    <section id="reach-us" className="py-48 px-6 relative z-20 text-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none">
        <video 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 block bg-black/20 z-0 pointer-events-none backdrop-blur-[2px]" />
      <div className="absolute inset-0 block bg-gradient-to-b from-background via-transparent to-background z-0 pointer-events-none opacity-90" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground/50">Reach Us</span>
        <h2 className="text-5xl md:text-7xl mt-8 mb-6 font-normal text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Ready to transcend?
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12">
          Leave the noise behind. Let's create something timeless together.
        </p>
        
        <a href="mailto:hello@velorah.studio" className="liquid-glass hover-glow inline-flex rounded-full px-14 py-5 text-base text-foreground hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          Begin Journey
        </a>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-sm text-muted-foreground">
          <span>hello@velorah.studio</span>
          <span className="hidden md:inline">•</span>
          <span>Stockholm, Sweden</span>
          <span className="hidden md:inline">•</span>
          <span>Usually responds within 24h</span>
        </div>
      </motion.div>
    </section>
  );
}

function Separator() {
  return (
    <div className="w-full h-[1px] bg-gradient-to-r from-background via-white/[0.04] to-background relative z-20" />
  );
}

export default function App() {
  useEffect(() => {
    // Enable smooth scrolling for anchor links globally
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full text-foreground selection:bg-white/20 bg-background">
      <Navigation />
      <Hero />
      <Studio />
      <Separator />
      <About />
      <Separator />
      <Journal />
      <Separator />
      <ReachUs />
    </div>
  );
}
