"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { DestinationsSection } from "@/components/destinations-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.8,
      staggerChildren: 0.2
    } 
  },
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30">
      
      <Navbar />
      
      <motion.main
        className="relative z-10"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <HeroSection />
        <div className="pb-12">
          <DestinationsSection />
          <TestimonialsSection />
        </div>
      </motion.main>
      
      <Footer />
    </div>
  )
}
