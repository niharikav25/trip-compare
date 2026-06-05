"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchBox } from "@/components/search-box"
import { Sparkles, ArrowRight, Tv } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] as any,
      staggerChildren: 0.12
    } 
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } 
  },
}

const tvCabinetVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  }
}

const images = [
  "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&h=1000&q=85", // Jaipur
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&h=1000&q=85", // Kerala
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&h=1000&q=85", // Taj Mahal
  "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1600&h=1000&q=85", // Ladakh
  "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1600&h=1000&q=85", // Goa
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&h=1000&q=85", // Beach Sunset
]

const imageCaptionsOSD = [
  "JAIPUR DIARY AT DAWN",
  "KERALA BACKWATERS TRIP",
  "TAJ MAHAL SUNRISE TOUR",
  "LADAKH EXPLORER ROUTE",
  "GOA SUNSET SHORELINE",
  "VARANASI GHATS AT DUSK"
]

const imageCaptions = [
  "Jaipur Diary",
  "Kerala Backwaters",
  "Taj Mahal Sunrise",
  "Ladakh Explorer",
  "Goa Sunset Shore",
  "Varanasi Ghats"
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPowerOn, setIsPowerOn] = useState(true)

  // Auto transition destination images inside the TV screen
  useEffect(() => {
    if (!isPowerOn) return
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPowerOn])

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background radial watercolor glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-30 pointer-events-none" />

      <div className="container relative mx-auto px-4 z-10 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Search Box */}
          <motion.div
            className="lg:col-span-7 space-y-6 text-left relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Sanskrit Watermark stain for Indian Aesthetic */}
            <div className="absolute -left-12 -top-14 z-[-1] select-none pointer-events-none opacity-[0.03] text-[16rem] font-bold font-hindi text-primary">
              यात्रा
            </div>

            {/* AI-Powered Tag / Hanging Ticket */}
            <motion.div 
              variants={itemVariants}
              className="relative inline-flex items-center gap-2 rounded-md border border-amber-900/15 bg-[#FAF4E8] pl-6 pr-4 py-2 text-xs font-semibold text-[#2A1215] shadow-xs rotate-[-1deg]"
            >
              {/* Hanging string logo */}
              <svg className="absolute -left-6 -top-2.5 h-4 w-7 text-amber-800/40" fill="none" viewBox="0 0 32 20">
                <path d="M 30 18 Q 12 10 2 2 Q 12 18 30 18" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              {/* Circle punch hole */}
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-900/10 border border-amber-900/20" />
              <span className="text-[11px] font-sans tracking-wide">AI-Powered Travel Comparison</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-6xl font-serif"
            >
              Find the Best <br />
              <span className="gradient-text italic">Travel Company</span> <br />
              <span className="heading-mixed font-light text-foreground/80">— intelligently.</span>
            </motion.h1>

            {/* Subheading tags */}
            <motion.p
              variants={itemVariants}
              className="text-xs text-amber-900/60 font-semibold tracking-wider font-sans text-left"
            >
              SMART COMPARISON &bull; AI TRAVEL ADVISOR &bull; TRUSTED REVIEWS
            </motion.p>

            {/* Jagged / Layered Paper Search Box Wrapper */}
            <motion.div
              variants={itemVariants}
              className="w-full shadow-md rounded-lg bg-[#FAF4E8] p-1.5 relative border border-amber-900/15 after:absolute after:inset-y-1 after:-inset-x-1.5 after:bg-amber-900/5 after:z-[-1] after:rounded-lg after:rotate-[0.5deg] before:absolute before:inset-y-1 before:-inset-x-1 before:bg-amber-900/10 before:z-[-2] before:rounded-lg before:-rotate-[0.5deg] mt-2"
            >
              <SearchBox />
            </motion.div>
            
            {/* Vintage Ticket Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mt-4"
            >
              <button 
                onClick={() => window.dispatchEvent(new Event("open-chatbot"))}
                className="group relative flex items-center gap-2 border-2 border-dashed border-[#8C202F]/30 bg-[#FAF4E8] px-6 py-3.5 text-sm font-semibold text-[#2A1215] shadow-md hover:shadow-lg hover:scale-[1.02] transition-all rounded-xs cursor-pointer rotate-[-0.5deg]"
              >
                <span>Get Started Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button 
                onClick={() => setIsPowerOn(!isPowerOn)}
                className="flex items-center gap-2 border-2 border-dashed border-[#8C202F]/30 bg-[#FAF4E8] px-6 py-3.5 text-sm font-semibold text-[#2A1215] shadow-md hover:shadow-lg hover:scale-[1.02] transition-all rounded-xs cursor-pointer rotate-[0.5deg]"
              >
                <Tv className="h-4 w-4" />
                <span>{isPowerOn ? "Turn Off TV" : "Turn On TV"}</span>
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-8 border-t border-primary/20 pt-6 md:gap-12 mt-6"
            >
              <div className="text-left">
                <div className="text-2xl font-bold text-[#2A1215] font-serif">500+</div>
                <div className="text-[9px] font-bold tracking-widest text-[#8C202F]/60 uppercase mt-0.5">Packages</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-[#2A1215] font-serif">50+</div>
                <div className="text-[9px] font-bold tracking-widest text-[#8C202F]/60 uppercase mt-0.5">Companies</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-[#2A1215] font-serif">10k+</div>
                <div className="text-[9px] font-bold tracking-widest text-[#8C202F]/60 uppercase mt-0.5">Travelers</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: TV Sitting on Leather Desk Mat */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center items-center relative py-6"
            initial="hidden"
            animate="visible"
            variants={tvCabinetVariants}
          >
            {/* Leather Desk Mat Container */}
            <div className="absolute inset-y-1 -inset-x-6 z-0 bg-gradient-to-br from-[#4E2B1E] via-[#351B12] to-[#200E08] rounded-[2rem] border-[3px] border-[#5E3222] shadow-2xl shadow-black/40 before:absolute before:inset-2 before:rounded-[1.6rem] before:border before:border-dashed before:border-amber-600/30 before:pointer-events-none" />

            {/* Vintage Peacock Postage Stamp */}
            <div className="absolute -top-8 -left-8 z-25 w-24 h-28 bg-[#FAF6EE] p-1.5 border border-[#8C202F]/10 shadow-lg rotate-[-12deg] flex flex-col justify-between items-center select-none rounded-sm">
              <div className="absolute inset-0.5 border border-dashed border-amber-900/20" />
              <div className="w-full h-full bg-[#E6DAC3] border border-amber-900/10 flex flex-col justify-between p-1 items-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="w-12 h-12 rounded-full border border-dashed border-red-950" />
                </div>
                <div className="text-[6px] font-bold text-[#2A1215] font-serif leading-none tracking-widest uppercase">INDIA POSTAGE</div>
                
                {/* SVG Peacock Silhouette */}
                <svg className="w-11 h-11 text-emerald-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                
                <div className="flex justify-between w-full items-baseline text-[7px] font-bold text-[#2A1215] font-serif leading-none">
                  <span>₹ ५.००</span>
                  <span>5.00</span>
                </div>
              </div>
            </div>

            {/* Antique Paper Map */}
            <div className="absolute -top-12 -right-8 z-0 w-36 h-28 bg-[#E6DAC3] border border-amber-950/15 shadow-md rotate-[12deg] p-1.5 rounded-sm select-none">
              <div className="w-full h-full border border-amber-950/10 relative overflow-hidden flex flex-col justify-between p-1">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_transparent_20%,_#8C202F_20%,_#8C202F_21%,_transparent_21%)] bg-[length:16px_16px]" />
                <div className="text-[6px] text-amber-950/40 uppercase tracking-widest font-mono select-none pointer-events-none">MAP OF INDIA</div>
                <div className="flex justify-between items-end">
                  <div className="text-[5px] text-amber-950/30">1982</div>
                  <div className="w-8 h-8 rounded-full border border-amber-950/20 flex items-center justify-center text-[4px] text-amber-950/30 font-serif rotate-[45deg]">N</div>
                </div>
              </div>
            </div>

            {/* Wax Seal with Gold Ribbons */}
            <div className="absolute -bottom-8 -left-8 z-35 flex flex-col items-center">
              <div className="absolute top-2 flex gap-1 z-10">
                <div className="w-4 h-16 bg-gradient-to-b from-[#C5A059] to-[#99793C] rounded-b-md transform -skew-x-[15deg] shadow-md" />
                <div className="w-4 h-16 bg-gradient-to-b from-[#C5A059] to-[#99793C] rounded-b-md transform skew-x-[15deg] shadow-md -ml-2" />
              </div>
              <div className="relative z-20 h-14 w-14 rounded-full bg-gradient-to-br from-[#8C202F] via-[#5E121E] to-[#3B070F] border border-black/40 shadow-lg flex items-center justify-center font-serif text-[#FAF6EE] font-bold text-xs rotate-[-15deg] cursor-default select-none">
                <span className="text-[9px] tracking-widest font-serif text-amber-400">A.T.</span>
                <div className="absolute inset-1.5 rounded-full border border-black/20" />
                <div className="absolute inset-2.5 rounded-full border border-[#FAF6EE]/10" />
              </div>
            </div>

            {/* TV Antenna */}
            <div className="absolute -top-12 h-16 w-32 flex justify-center pointer-events-none select-none z-10">
              <div className="w-1 h-12 bg-gray-500 origin-bottom -rotate-30 rounded-t-full shadow-sm" />
              <div className="w-1 h-12 bg-gray-500 origin-bottom rotate-30 rounded-t-full shadow-sm -ml-0.5" />
            </div>

            {/* Vintage TV Cabinet Frame */}
            <div className="relative w-full max-w-[430px] aspect-[4/3] rounded-[2rem] p-4 bg-gradient-to-br from-[#5A2C18] via-[#3E1E10] to-[#251007] border-4 border-[#1E0C06] shadow-2xl flex gap-3 items-stretch select-none z-10">
              <div className="absolute inset-1.5 rounded-[1.8rem] border border-amber-600/30 pointer-events-none" />

              {/* CRT Display Screen Box */}
              <div className="relative flex-1 bg-black rounded-2xl overflow-hidden border-4 border-[#1B0A04] shadow-[inset_0_0_30px_rgba(0,0,0,1)] flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_40px_rgba(0,0,0,0.85)] z-20 pointer-events-none border border-black/40" />
                <div className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-70" />
                <div className="absolute inset-0 pointer-events-none z-30 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.45)_50%)] bg-[length:100%_4px]" />
                <div className="absolute inset-0 pointer-events-none z-20 bg-primary/2 mix-blend-overlay opacity-90 animate-pulse" />

                <AnimatePresence mode="wait">
                  {isPowerOn ? (
                    <motion.div
                      key={currentImageIndex}
                      className="absolute inset-0 h-full w-full"
                      initial={{ opacity: 0, scale: 0.98, filter: "brightness(2) contrast(1.5) blur(4px)" }}
                      animate={{ opacity: 0.95, scale: 1, filter: "brightness(1) contrast(1) blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.98, filter: "brightness(2.5) contrast(1.8) blur(6px)" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <div className="absolute inset-0 bg-[#A68870]/10 z-10 pointer-events-none mix-blend-color-burn" />
                      
                      {/* Top Filmstrip Sprockets */}
                      <div className="absolute top-0 inset-x-0 h-3 bg-black/90 flex justify-between items-center px-4 z-20">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="w-2.5 h-1.5 bg-[#FAF6EE]/10 rounded-[1px] border border-white/5" />
                        ))}
                      </div>

                      <img 
                        src={images[currentImageIndex]} 
                        className="h-full w-full object-cover py-3" 
                        alt={imageCaptions[currentImageIndex]} 
                      />

                      {/* Bottom Filmstrip Sprockets */}
                      <div className="absolute bottom-0 inset-x-0 h-3 bg-black/90 flex justify-between items-center px-4 z-20">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="w-2.5 h-1.5 bg-[#FAF6EE]/10 rounded-[1px] border border-white/5" />
                        ))}
                      </div>

                      {/* Retro Green OSD Channel Overlay */}
                      <div className="absolute top-4 left-3 z-30 font-mono text-[9px] text-emerald-500 opacity-80 uppercase tracking-widest select-none pointer-events-none drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] font-semibold">
                        CHL8C-- {imageCaptionsOSD[currentImageIndex]}
                      </div>
                      
                      <div className="absolute bottom-4 right-3 z-30 font-mono text-[8px] text-amber-500 opacity-60 uppercase select-none pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                        REC [●]
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="absolute inset-0 bg-[#121212] flex items-center justify-center"
                      initial={{ scaleY: 1 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0.01 }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-white/40 blur-[1px] shadow-[0_0_10px_white]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Retro Control Panel */}
              <div className="w-[72px] shrink-0 flex flex-col justify-between items-center py-4 bg-gradient-to-b from-[#2E150B] to-[#120703] rounded-xl border border-[#0F0502] shadow-inner relative">
                <div className="text-[9px] font-bold text-amber-500/80 font-serif tracking-widest uppercase select-none pointer-events-none mt-1">
                  KELTRON
                </div>

                <div className="flex flex-col items-center gap-1 my-3">
                  <div className="text-[7px] text-amber-600/60 font-semibold uppercase tracking-wider scale-90">Channel</div>
                  <motion.div 
                    animate={{ rotate: currentImageIndex * 60 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="h-10 w-10 rounded-full bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] border border-amber-600/30 shadow-md relative cursor-pointer active:scale-95"
                    onClick={() => {
                      if (isPowerOn) setCurrentImageIndex((prev) => (prev + 1) % images.length)
                    }}
                  >
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 h-2 w-0.5 bg-amber-500 rounded-full" />
                  </motion.div>
                </div>

                <div className="flex flex-col items-center gap-1 my-2">
                  <div className="text-[7px] text-amber-600/60 font-semibold uppercase tracking-wider scale-90">Volume</div>
                  <div className="h-7 w-7 rounded-full bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] border border-amber-600/20 shadow-md relative cursor-pointer rotate-[120deg] active:scale-95">
                    <div className="absolute top-0.5 left-1/2 -translate-x-1/2 h-1.5 w-0.5 bg-amber-500/80 rounded-full" />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 mt-4 mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className={`h-1.5 w-1.5 rounded-full shadow-md transition-all duration-300 ${isPowerOn ? "bg-red-500 animate-pulse ring-1 ring-red-400" : "bg-red-950"}`} />
                    <span className="text-[6px] text-gray-500 font-bold uppercase tracking-widest scale-90">Power</span>
                  </div>
                  <button 
                    onClick={() => setIsPowerOn(!isPowerOn)}
                    className={`h-4 w-7 rounded-md border-b-2 border-[#120703] transition-all duration-150 cursor-pointer active:translate-y-0.5 ${isPowerOn ? "bg-red-800 border-t-2 border-red-600 hover:bg-red-700" : "bg-red-950 hover:bg-red-900"}`}
                  />
                </div>
              </div>
            </div>

            {/* Television Feet Stands */}
            <div className="w-[380px] h-4 relative flex justify-between px-16 pointer-events-none select-none z-0">
              <div className="w-4 h-6 bg-gradient-to-b from-[#251007] to-[#120703] rounded-b-md transform -skew-x-[20deg] shadow-lg" />
              <div className="w-4 h-6 bg-gradient-to-b from-[#251007] to-[#120703] rounded-b-md transform skew-x-[20deg] shadow-lg" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
