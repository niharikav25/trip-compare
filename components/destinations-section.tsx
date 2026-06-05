"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Globe } from "lucide-react"
import { destinations } from "@/lib/data"

// @ts-ignore
import indiaMap from "@svg-maps/india"

const getVintageStateClass = (stateId: string, isHovered: boolean, isTarget: boolean) => {
  if (!isTarget) {
    return isHovered 
      ? "fill-[#D8C3A5]/40 stroke-[#5C4D46]/30" 
      : "fill-transparent stroke-[#5C4D46]/20"
  }
  
  const colors: Record<string, { normal: string; hover: string }> = {
    rj: { normal: "fill-[#C88A8A]/35 stroke-[#8C202F]/50", hover: "fill-[#C88A8A]/60 stroke-[#8C202F]/90" },
    ga: { normal: "fill-[#7CAEA3]/35 stroke-[#8C202F]/50", hover: "fill-[#7CAEA3]/60 stroke-[#8C202F]/90" },
    hp: { normal: "fill-[#8CA5C8]/35 stroke-[#8C202F]/50", hover: "fill-[#8CA5C8]/60 stroke-[#8C202F]/90" },
    kl: { normal: "fill-[#8CB482]/35 stroke-[#8C202F]/50", hover: "fill-[#8CB482]/60 stroke-[#8C202F]/90" },
    jk: { normal: "fill-[#C8B282]/35 stroke-[#8C202F]/50", hover: "fill-[#C8B282]/60 stroke-[#8C202F]/90" },
    up: { normal: "fill-[#C8A082]/35 stroke-[#8C202F]/50", hover: "fill-[#C8A082]/60 stroke-[#8C202F]/90" },
  }

  const config = colors[stateId] || { normal: "fill-[#D8C3A5]/30 stroke-[#8C202F]/40", hover: "fill-[#D8C3A5]/60 stroke-[#8C202F]/90" }
  return `${isHovered ? config.hover : config.normal} cursor-pointer`
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
  },
}

// Center coordinates for active states on 612x696 viewBox
const mapLocations: Record<string, { stateId: string; x: number; y: number; name: string }> = {
  rajasthan: { stateId: "rj", x: 119, y: 262, name: "Rajasthan" },
  goa: { stateId: "ga", x: 122, y: 512, name: "Goa" },
  manali: { stateId: "hp", x: 191, y: 133, name: "Manali" },
  varanasi: { stateId: "up", x: 265, y: 245, name: "Varanasi" },
  kerala: { stateId: "kl", x: 166, y: 615, name: "Kerala" },
  ladakh: { stateId: "jk", x: 173, y: 61, name: "Ladakh" }
}

const destinationDescriptions: Record<string, string> = {
  rajasthan: "Experience the royal heritage, golden deserts, and grand palaces of the Land of Kings.",
  goa: "Relax on pristine sandy beaches, enjoy vibrant nightlife, and explore historic Portuguese culture.",
  manali: "Escape to snow-capped peaks, lush pine forests, and thrilling mountain adventure sports.",
  kerala: "Cruise through serene backwaters, unwind in green hill stations, and experience Ayurvedic healing.",
  ladakh: "Traverse high-altitude cold deserts, crystal lakes, and ancient cliffside monasteries.",
  varanasi: "Immerse yourself in spiritual ghats, daily Ganga Aarti, and the rich cultural soul of India's oldest city."
}

export function DestinationsSection() {
  const router = useRouter()
  const [hoveredDest, setHoveredDest] = useState<any>(destinations.find(d => d.id === "rajasthan") || destinations[0])
  const [selectedDest, setSelectedDest] = useState<any>(null)
  const [planeState, setPlaneState] = useState<{
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
    angleStart: number;
    angleEnd: number;
    midX: number;
    midY: number;
    isAnimating: boolean;
  }>({
    startX: 300,
    startY: 200, // New Delhi center
    targetX: 300,
    targetY: 200,
    angleStart: 0,
    angleEnd: 0,
    midX: 300,
    midY: 200,
    isAnimating: false,
  })

  const handleDestinationClick = (dest: any) => {
    if (planeState.isAnimating) return

    const loc = mapLocations[dest.id as keyof typeof mapLocations]
    if (!loc) return

    const startX = planeState.targetX
    const startY = planeState.targetY
    const targetX = loc.x
    const targetY = loc.y

    const dx = targetX - startX
    const dy = targetY - startY
    const dist = Math.hypot(dx, dy)

    // Calculate curved arc coordinate
    const midX = (startX + targetX) / 2
    const midY = (startY + targetY) / 2 - Math.min(dist * 0.25, 60)

    const angleStart = Math.atan2(midY - startY, midX - startX) * (180 / Math.PI) + 90
    const angleEnd = Math.atan2(targetY - midY, targetX - midX) * (180 / Math.PI) + 90

    setSelectedDest(dest)
    setPlaneState({
      startX,
      startY,
      targetX,
      targetY,
      angleStart,
      angleEnd,
      midX,
      midY,
      isAnimating: true,
    })
  }

  return (
    <section className="relative py-10 md:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              <Globe className="h-4 w-4" />
              <span>Vibrant Heritage</span>
            </div>
            <h2 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl font-serif">
              Popular <span className="gradient-text italic font-serif">Destinations</span>
            </h2>
            <p className="text-lg text-foreground/75">
              Explore our most loved travel destinations through our interactive map lenses.
            </p>
          </motion.div>
          
          <Link
            href="/explore"
            className="hidden items-center gap-2 rounded-full border border-primary/20 bg-secondary/40 px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary/60 hover:text-primary md:flex"
          >
            Explore All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Desktop Interactive Map Layout */}
        <div className="hidden lg:flex lg:gap-12 lg:items-stretch">
          {/* Map Column */}
          <div 
            className="w-[55%] flex items-center justify-center relative select-none p-4 sm:p-5 rounded-2xl overflow-hidden vintage-map-frame"
            style={{
              background: "radial-gradient(circle, #F6ECD7 20%, #E8D6B5 60%, #CBB58F 100%)",
              boxShadow: "0 10px 30px -5px rgba(139,90,43,0.15), inset 0 0 50px rgba(139,90,43,0.2)",
              border: "1px solid rgba(139,90,43,0.15)"
            }}
          >
            {/* Vintage aged paper vignette effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8c6239]/5 via-transparent to-[#8c6239]/12 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(140,98,57,0.08)_100%)] pointer-events-none z-10" />
            {/* Subtle grid pattern background */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 bg-repeat bg-center" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='45' height='45' viewBox='0 0 45 45'%3E%3Cpath d='M 45 0 L 0 0 0 45' fill='none' stroke='%238C202F' stroke-width='1.5'/%3E%3C/svg%3E")` }} />

            <svg
              viewBox={indiaMap.viewBox}
              className="w-full max-h-[550px] drop-shadow-[2px_4px_12px_rgba(94,77,68,0.12)] relative z-10"
            >
              <defs>
                <filter id="vintage-sketch" x="-10%" y="-10%" width="120%" height="120%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>

              {/* Map Grid Lines */}
              <g id="grid-lines" opacity="0.2" className="pointer-events-none">
                {/* Latitudes */}
                <path d="M 20 150 L 592 150" stroke="#5C4D46" strokeWidth="0.75" strokeDasharray="3 6" />
                <path d="M 20 300 L 592 300" stroke="#5C4D46" strokeWidth="0.75" strokeDasharray="3 6" />
                <path d="M 20 450 L 592 450" stroke="#5C4D46" strokeWidth="0.75" strokeDasharray="3 6" />
                <path d="M 20 600 L 592 600" stroke="#5C4D46" strokeWidth="0.75" strokeDasharray="3 6" />
                {/* Longitudes */}
                <path d="M 150 20 L 150 676" stroke="#5C4D46" strokeWidth="0.75" strokeDasharray="3 6" />
                <path d="M 300 20 L 300 676" stroke="#5C4D46" strokeWidth="0.75" strokeDasharray="3 6" />
                <path d="M 450 20 L 450 676" stroke="#5C4D46" strokeWidth="0.75" strokeDasharray="3 6" />

                {/* Coordinates Degree Labels */}
                <g className="font-serif text-[8px] fill-[#5C4D46] font-bold">
                  <text x="25" y="146">32° N</text>
                  <text x="25" y="296">24° N</text>
                  <text x="25" y="446">16° N</text>
                  <text x="25" y="596">8° N</text>
                  
                  <text x="154" y="670">68° E</text>
                  <text x="304" y="670">76° E</text>
                  <text x="454" y="670">84° E</text>
                </g>
              </g>

              {/* Cartographic Double Border */}
              <g id="border-frame" opacity="0.5" className="pointer-events-none">
                <rect x="8" y="8" width="596" height="680" rx="16" fill="none" stroke="#8C202F" strokeWidth="1.8" />
                <rect x="14" y="14" width="584" height="668" rx="12" fill="none" stroke="#8C202F" strokeWidth="0.75" />
              </g>

              {/* Ocean Labels */}
              <g opacity="0.35" className="pointer-events-none select-none font-serif font-bold italic fill-[#8C202F]">
                <text x="80" y="520" transform="rotate(12 80 520)" className="text-[10px] tracking-[0.4em]">ARABIAN SEA</text>
                <text x="440" y="420" transform="rotate(-12 440 420)" className="text-[10px] tracking-[0.4em]">BAY OF BENGAL</text>
                <text x="380" y="660" transform="rotate(-1 380 660)" className="text-[11px] tracking-[0.4em]">INDIAN OCEAN</text>
              </g>

              {/* Compass Rose overlay */}
              <g transform="translate(510, 560) scale(0.85)" opacity="0.6" className="pointer-events-none select-none">
                <circle cx="0" cy="0" r="40" fill="none" stroke="#8C202F" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="37" fill="none" stroke="#8C202F" strokeWidth="0.5" strokeDasharray="2 3" />
                <circle cx="0" cy="0" r="34" fill="none" stroke="#8C202F" strokeWidth="0.5" />
                
                <polygon points="0,0 -6,-10 0,-45" fill="#8C202F" />
                <polygon points="0,0 6,-10 0,-45" fill="none" stroke="#8C202F" strokeWidth="0.75" />
                
                <polygon points="0,0 6,10 0,45" fill="#8C202F" />
                <polygon points="0,0 -6,10 0,45" fill="none" stroke="#8C202F" strokeWidth="0.75" />
                
                <polygon points="0,0 10,-6 45,0" fill="#8C202F" />
                <polygon points="0,0 10,6 45,0" fill="none" stroke="#8C202F" strokeWidth="0.75" />
                
                <polygon points="0,0 -10,6 -45,0" fill="#8C202F" />
                <polygon points="0,0 -10,-6 -45,0" fill="none" stroke="#8C202F" strokeWidth="0.75" />
                
                <polygon points="0,0 2,-8 28,-28" fill="#8C202F" opacity="0.7" />
                <polygon points="0,0 8,-2 28,-28" fill="none" stroke="#8C202F" strokeWidth="0.5" />
                
                <polygon points="0,0 8,2 28,28" fill="#8C202F" opacity="0.7" />
                <polygon points="0,0 2,8 28,28" fill="none" stroke="#8C202F" strokeWidth="0.5" />
                
                <polygon points="0,0 -8,-2 -28,-28" fill="#8C202F" opacity="0.7" />
                <polygon points="0,0 -2,-8 -28,-28" fill="none" stroke="#8C202F" strokeWidth="0.5" />
                
                <polygon points="0,0 -2,8 -28,28" fill="#8C202F" opacity="0.7" />
                <polygon points="0,0 -8,2 -28,28" fill="none" stroke="#8C202F" strokeWidth="0.5" />

                <circle cx="0" cy="0" r="5" fill="#E8D6B5" stroke="#8C202F" strokeWidth="1" />
                <circle cx="0" cy="0" r="2" fill="#8C202F" />
                
                <text x="-4" y="-50" className="font-serif text-[11px] font-bold fill-[#8C202F]">N</text>
              </g>

              {/* Route lines */}
              <g id="routes">
                {Object.entries(mapLocations).map(([id, loc]) => {
                  const isHovered = hoveredDest?.id === id
                  const controlPoints: Record<string, { cx: number; cy: number }> = {
                    rajasthan: { cx: 220, cy: 180 },
                    goa: { cx: 160, cy: 300 },
                    manali: { cx: 260, cy: 130 },
                    varanasi: { cx: 290, cy: 210 },
                    kerala: { cx: 180, cy: 350 },
                    ladakh: { cx: 260, cy: 80 }
                  }
                  const cp = controlPoints[id] || { cx: (300 + loc.x) / 2, cy: (200 + loc.y) / 2 }
                  return (
                    <path
                      key={`route-${id}`}
                      d={`M 300 200 Q ${cp.cx} ${cp.cy} ${loc.x} ${loc.y}`}
                      fill="none"
                      className={`transition-all duration-300 ${
                        isHovered 
                          ? "stroke-[#8C202F]/80 stroke-[2]" 
                          : "stroke-[#5c422c]/25 stroke-[1.2]"
                      }`}
                      strokeDasharray="4 6"
                    />
                  )
                })}
              </g>

              {/* Map States */}
              <g id="states" filter="url(#vintage-sketch)">
                {indiaMap.locations.map((loc: any) => {
                  const isTarget = Object.values(mapLocations).some(d => d.stateId === loc.id)
                  const destId = Object.keys(mapLocations).find(k => mapLocations[k].stateId === loc.id)
                  const destData = destId ? destinations.find(d => d.id === destId) : null
                  const isHovered = destId && hoveredDest?.id === destId

                  return (
                    <path
                      key={loc.id}
                      d={loc.path}
                      className={getVintageStateClass(loc.id, !!isHovered, isTarget)}
                      onMouseEnter={() => {
                        if (destData) setHoveredDest(destData)
                      }}
                      onClick={() => {
                        if (destData) handleDestinationClick(destData)
                      }}
                    />
                  )
                })}
              </g>

              {/* Delhi Hub Marker */}
              <g id="hub" className="pointer-events-none">
                <circle cx="300" cy="200" r="5" className="fill-[#8C202F] stroke-[#FAF6EE] stroke-1" />
                <circle cx="300" cy="200" r="1.5" className="fill-[#FAF6EE]" />
              </g>

              {/* Coordinates Markers / Crosshairs */}
              <g id="markers">
                {Object.entries(mapLocations).map(([id, loc]) => {
                  const destData = destinations.find(d => d.id === id)
                  if (!destData) return null
                  const isHovered = hoveredDest?.id === id

                  return (
                    <g
                      key={id}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredDest(destData)}
                      onClick={() => handleDestinationClick(destData)}
                    >
                      {/* Outer cartographer circle */}
                      <circle
                        cx={loc.x}
                        cy={loc.y}
                        r={isHovered ? 11 : 8}
                        className="fill-none stroke-[#8C202F]/60 stroke-[1.5] transition-all duration-300"
                      />
                      {/* Inner solid ink core */}
                      <circle
                        cx={loc.x}
                        cy={loc.y}
                        r={isHovered ? 4.5 : 3}
                        className="fill-[#8C202F] stroke-none transition-all duration-300"
                      />
                      {/* Crosshairs */}
                      <line x1={loc.x} y1={loc.y - (isHovered ? 15 : 11)} x2={loc.x} y2={loc.y + (isHovered ? 15 : 11)} className="stroke-[#8C202F]/45 stroke-[0.75]" />
                      <line x1={loc.x - (isHovered ? 15 : 11)} y1={loc.y} x2={loc.x + (isHovered ? 15 : 11)} y2={loc.y} className="stroke-[#8C202F]/45 stroke-[0.75]" />
                    </g>
                  )
                })}
              </g>

              {/* Plane Transition Overlay */}
              <g id="plane-transition">
                {planeState.isAnimating && (
                  <motion.g
                    initial={{
                      x: planeState.startX,
                      y: planeState.startY,
                      rotate: planeState.angleStart,
                      opacity: 0,
                      scale: 0.8
                    }}
                    animate={{
                      x: [planeState.startX, planeState.midX, planeState.targetX],
                      y: [planeState.startY, planeState.midY, planeState.targetY],
                      rotate: [planeState.angleStart, (planeState.angleStart + planeState.angleEnd) / 2, planeState.angleEnd],
                      opacity: [0, 1, 1, 0],
                      scale: [0.8, 1.2, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 1.4,
                      ease: "easeInOut",
                      times: [0, 0.15, 0.85, 1]
                    }}
                    onAnimationComplete={() => {
                      router.push(`/explore?destination=${selectedDest.name}`)
                    }}
                    className="pointer-events-none origin-center"
                  >
                    {/* Glowing trail effect */}
                    <circle r="8" className="fill-[#8C202F]/30 blur-[3px]" />
                    {/* SVG Plane Icon */}
                    <g transform="translate(-10, -10) scale(0.95)">
                      <path
                        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z"
                        className="fill-[#8C202F] stroke-primary-foreground stroke-[0.5] drop-shadow-[1px_2px_4px_rgba(94,77,68,0.3)]"
                      />
                    </g>
                  </motion.g>
                )}
              </g>
            </svg>
          </div>

          {/* Details Column (Glassmorphism card stretched to match map) */}
          <div className="w-[45%] flex flex-col items-stretch">
            <AnimatePresence mode="wait">
              {hoveredDest && (
                <motion.div
                  key={hoveredDest.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="glass-dark relative rounded-[2rem] border border-primary/20 overflow-hidden shadow-2xl flex-1 flex flex-col"
                >
                  {/* cover image */}
                  <div className="relative h-[340px] w-full overflow-hidden flex-shrink-0">
                    <Image
                      src={hoveredDest.image}
                      alt={hoveredDest.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#250508]/90 via-[#250508]/30 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <Badge className="mb-2 bg-primary/10 text-primary border border-primary/30 backdrop-blur-md">
                        {hoveredDest.packageCount} packages
                      </Badge>
                      <h3 className="text-3xl font-bold text-[#FAF4E8] tracking-tight font-serif">{hoveredDest.name}</h3>
                    </div>
                  </div>

                  {/* details expanded and justified */}
                  <div className="p-8 flex flex-col flex-1 justify-between gap-6">
                    <p className="text-[#FAF4E8]/80 text-lg leading-relaxed font-sans">
                      {destinationDescriptions[hoveredDest.id as keyof typeof destinationDescriptions] || 
                        "Explore outstanding vacation packages and build unforgettable memories."}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-primary/20 flex-shrink-0">
                      <div>
                        <p className="text-sm font-semibold tracking-wider uppercase text-[#FAF4E8]/50">Starting from</p>
                        <p className="text-3xl font-extrabold text-[#FAF4E8] mt-1 font-serif">₹{hoveredDest.startingPrice.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => handleDestinationClick(hoveredDest)}
                        disabled={planeState.isAnimating}
                        className="glow-hover flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      >
                        {planeState.isAnimating && selectedDest?.id === hoveredDest.id ? (
                          <span>Flying...</span>
                        ) : (
                          <>
                            <span>Fly & Explore</span>
                            <ArrowRight className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Layout (Original Cards Grid for accessibility and touch targets) */}
        <div className="lg:hidden">
          <motion.div 
            className="grid gap-6 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {destinations.map((destination) => (
              <div
                key={destination.id}
                onClick={() => handleDestinationClick(destination)}
                className="group block cursor-pointer"
              >
                <motion.div
                  variants={itemVariants}
                  className="glass-dark relative aspect-[16/11] overflow-hidden rounded-[2.5rem] border border-primary/10 p-2 transition-all duration-500 hover:border-primary/50"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#250508]/90 via-[#250508]/20 to-transparent" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="mb-2 text-2xl font-bold text-[#FAF4E8] transition-transform group-hover:-translate-y-0.5 font-serif">
                        {destination.name}
                      </h3>
                      <div className="flex items-center gap-4 transition-all duration-500 group-hover:translate-x-0.5">
                        <Badge variant="secondary" className="bg-primary/20 text-[#FAF4E8] backdrop-blur-md border border-primary/30 text-xs">
                          {destination.packageCount} packages
                        </Badge>
                        <span className="text-xs font-medium text-[#FAF4E8]/80">
                          from <span className="text-primary text-base font-semibold">₹{destination.startingPrice.toLocaleString()}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow detail */}
                  <div className="absolute -inset-[1px] -z-10 rounded-[2.5rem] bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-500 blur-sm" />
                </motion.div>
              </div>
            ))}
          </motion.div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/explore"
              className="flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/40 px-8 py-4 text-sm font-medium text-foreground hover:bg-secondary/60 hover:text-primary transition-all"
            >
              Explore All Destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
