"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import { Star, MessageSquare, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { testimonials } from "@/lib/data"

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [width, setWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse Parallax Motion Values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  // Parallax translation layers
  const shadowX = useTransform(springX, [-0.5, 0.5], [-20, 20])
  const shadowY = useTransform(springY, [-0.5, 0.5], [-20, 20])

  const flowerParallaxX = useTransform(springX, [-0.5, 0.5], [-12, 12])
  const flowerParallaxY = useTransform(springY, [-0.5, 0.5], [-12, 12])

  const photoParallaxX = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const photoParallaxY = useTransform(springY, [-0.5, 0.5], [-8, 8])

  const illustrationParallaxX = useTransform(springX, [-0.5, 0.5], [16, -16])
  const illustrationParallaxY = useTransform(springY, [-0.5, 0.5], [16, -16])

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth)
      } else {
        setWidth(window.innerWidth)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isPlaying || isHovered) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isPlaying, isHovered])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Calculate layout parameters for responsive sizing and centering
  const isMobile = width < 768
  const containerWidth = width || 800 // Fallback during hydration
  const cardWidth = isMobile ? containerWidth * 0.90 : Math.min(940, containerWidth - 160)
  const gap = isMobile ? containerWidth * 0.04 : 32
  const offset = isMobile ? containerWidth * 0.05 : (containerWidth - cardWidth) / 2
  const translation = offset - activeIndex * (cardWidth + gap)

  // Arrow position: place arrows centered in the side gutters, completely outside the active card on desktop
  const arrowWidth = isMobile ? 32 : 44

  return (
    <section className="relative py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 relative max-w-4xl mx-auto"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8C202F]/15 bg-[#FAF6EE] px-4 py-1.5 text-xs sm:text-sm font-bold text-[#8C202F] font-serif shadow-sm">
            <MessageSquare className="h-4 w-4 animate-pulse" />
            <span>Customer Stories</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-center font-serif">
            Trusted by{" "}
            <span className="font-script text-[#8C202F] italic font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block align-middle mx-1">
              Global
            </span>{" "}
            Explorers
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-foreground/75">
            Real experiences from travelers who discovered a smarter way to see the world.
          </p>

          {/* Background Stamp Overlay on Top Right */}
          <div className="absolute -right-4 -top-4 md:-right-8 md:-top-8 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none select-none z-10 hidden md:block rotate-[15deg] mix-blend-multiply">
            <Image
              src="/illustrations/postmark-stamp.png"
              alt="Postcard Stamp"
              fill
              className="object-contain opacity-90"
            />
          </div>
        </motion.div>

        {/* Postcard Carousel Window */}
        <div ref={containerRef} className="relative mx-auto max-w-6xl py-4 px-1 select-none">
          
          {/* Navigation Arrows (Centered in gutters outside active card) */}
          <button 
            onClick={prevSlide} 
            className="absolute z-30 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#4A121A] text-[#FAF6EE] hover:bg-[#8C202F] transition-all shadow-md active:scale-95 cursor-pointer animate-none"
            style={isMobile ? { 
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)" 
            } : {
              left: `calc(50% - ${cardWidth / 2}px - 60px)`,
              top: "50%",
              transform: "translateY(-50%)"
            }}
            aria-label="Previous story"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>
          
          <button 
            onClick={nextSlide} 
            className="absolute z-30 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#4A121A] text-[#FAF6EE] hover:bg-[#8C202F] transition-all shadow-md active:scale-95 cursor-pointer animate-none"
            style={isMobile ? { 
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)" 
            } : {
              left: `calc(50% + ${cardWidth / 2}px + 16px)`,
              top: "50%",
              transform: "translateY(-50%)"
            }}
            aria-label="Next story"
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>

          {/* Sliding flex row track */}
          <motion.div
            className="flex flex-row items-center cursor-grab active:cursor-grabbing"
            style={{ 
              gap: `${gap}px`,
              width: "max-content"
            }}
            animate={{ x: translation }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            drag="x"
            dragConstraints={{ left: translation, right: translation }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x < -60) {
                nextSlide()
              } else if (info.offset.x > 60) {
                prevSlide()
              }
            }}
          >
            {testimonials.map((testimonial, idx) => {
              const isCardActive = idx === activeIndex
              
              return (
                <motion.div
                  key={testimonial.id}
                  className="postcard shrink-0 flex flex-row items-stretch relative"
                  style={{ 
                    width: `${cardWidth}px`,
                    minHeight: isMobile ? "320px" : "385px"
                  }}
                  animate={{ 
                    opacity: isCardActive ? 1 : 0.4, 
                    scale: isCardActive ? 1 : 0.95 
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onMouseMove={isCardActive ? handleMouseMove : undefined}
                  onMouseLeave={isCardActive ? handleMouseLeave : undefined}
                  onMouseEnter={isCardActive ? handleMouseEnter : undefined}
                >
                  {/* Dynamic shadow layer behind the active card based on mouse parallax */}
                  {isCardActive && (
                    <motion.div 
                      className="absolute inset-0 bg-[#3d241d]/12 blur-2xl pointer-events-none z-0" 
                      style={{ x: shadowX, y: shadowY }}
                    />
                  )}

                  {/* Stamp scalloped outer border container */}
                  <div className="absolute inset-0 stamp-border pointer-events-none z-30" />
                  
                  {/* Thin inner border outline framing the postcard content inside the stamp border */}
                  <div className="absolute inset-1.5 border border-[#8C202F]/15 pointer-events-none z-30" />
                  
                  {/* Decorative Overlays (responsive layers) */}
                  {/* Folk Indian Women (Top Left overlapping border) */}
                  <div className="absolute -top-5 left-4 sm:-top-6 sm:left-6 md:-top-7 md:left-8 w-16 h-8 sm:w-22 sm:h-11 md:w-26 md:h-13 pointer-events-none select-none z-10 hidden sm:block mix-blend-multiply">
                    <Image 
                      src="/illustrations/folk-women.png" 
                      alt="Indian folk women illustration" 
                      fill
                      className="object-contain" 
                    />
                  </div>

                  {/* Hand Painted Watercolor Flower (Left Margin overlapping border, sways gently) */}
                  <motion.div 
                    className="absolute -left-4 bottom-4 w-14 h-28 sm:-left-6 sm:w-20 sm:h-40 md:-left-8 md:w-24 md:h-48 pointer-events-none select-none z-10 hidden sm:block mix-blend-multiply"
                    animate={{ rotate: [0, 1.5, -1.5, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    style={isCardActive ? { x: flowerParallaxX, y: flowerParallaxY } : undefined}
                  >
                    <Image 
                      src="/illustrations/vintage-flower.png" 
                      alt="Vintage watercolor flower" 
                      fill
                      className="object-contain" 
                    />
                  </motion.div>

                  {/* Postmark Wavy Ink Lines */}
                  <div className="absolute left-[68%] top-[45%] -translate-y-1/2 opacity-25 pointer-events-none select-none z-0 hidden lg:block">
                    <svg width="100" height="45" viewBox="0 0 120 50" fill="none" stroke="currentColor" className="text-primary stroke-[0.75]">
                      <path d="M0,8 C15,0 20,15 35,8 C50,0 55,15 70,8 C85,0 90,15 105,8 C115,3 120,8 120,8" />
                      <path d="M0,20 C15,12 20,27 35,20 C50,12 55,27 70,20 C85,12 90,27 105,20 C115,15 120,20 120,20" />
                      <path d="M0,32 C15,24 20,39 35,32 C50,24 55,39 70,32 C85,24 90,39 105,32 C115,27 120,32 120,32" />
                    </svg>
                  </div>

                  {/* Small decorative pink flower near bottom center of the photo */}
                  <div className="absolute bottom-2 left-[42%] w-5 h-5 sm:w-6 sm:h-6 pointer-events-none select-none opacity-80 z-10 hidden sm:block mix-blend-multiply">
                    <Image 
                      src="/illustrations/vintage-flower.png" 
                      alt="Small flower" 
                      fill
                      className="object-contain rotate-45" 
                    />
                  </div>

                  {/* Column 1: Left Card content (Review Text, Quote Box, User Info) */}
                  <div className="w-[65%] sm:w-[55%] flex flex-col justify-between text-left relative z-20 pl-5 sm:pl-20 md:pl-24 lg:pl-28 pr-3 sm:pr-6 md:pr-8 pt-5 pb-6 sm:pt-8 sm:pb-10 md:pt-10 md:pb-12">
                    <div>
                      {/* Quote icon box */}
                      <div className="mb-2 sm:mb-3 inline-flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-[#4A121A] text-[#FAF6EE] shadow-sm">
                        <span className="font-serif text-base sm:text-xl font-bold leading-none">“</span>
                      </div>

                      {/* Comment */}
                      <p className="font-script text-[17px] sm:text-[19px] md:text-[22px] lg:text-[25px] italic leading-snug sm:leading-normal md:leading-relaxed text-[#2A1215]">
                        &ldquo;{testimonial.comment}&rdquo;
                      </p>
                    </div>

                    <div>
                      <div className="w-full border-t border-primary/20 my-2 sm:my-3" />

                      {/* Profile info footer */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full border border-primary shadow-sm flex-shrink-0">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[#2A1215] text-xs sm:text-sm md:text-base leading-none font-serif truncate">
                            {testimonial.name}
                          </h4>
                          <p className="text-[9px] sm:text-xs font-semibold text-muted-foreground mt-0.5 sm:mt-1 font-sans truncate">
                            {testimonial.role}
                          </p>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 bg-primary/5 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-primary/10 flex-shrink-0">
                          <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                          <span className="text-[10px] sm:text-sm font-bold text-foreground">{testimonial.rating}.0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Middle Card content (Jaipur/Destination Stamp Photo) */}
                  <div className="w-[35%] sm:w-[25%] flex items-center justify-center relative z-20 pl-2">
                    <div className="stamp-photo-border relative w-24 h-32 sm:w-32 sm:h-44 md:w-40 md:h-52 lg:w-44 lg:h-56 bg-white p-1 sm:p-1.5 rotate-[3deg] shadow-lg hover:rotate-0 transition-transform duration-300 pointer-events-none select-none flex-shrink-0 z-20">
                      <div className="w-full h-full relative overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Right Card content (Elephant, Food Thali, DFR Logo) */}
                  <div className="w-0 sm:w-[20%] relative z-10 hidden sm:block">
                    {/* DFR Logo */}
                    <div className="absolute right-4 top-4 md:right-8 md:top-6 w-10 h-10 pointer-events-none select-none z-20">
                      <span className="font-serif font-bold text-[10px] sm:text-xs text-primary/45 tracking-widest block border border-dashed border-primary/20 p-1 text-center rounded-sm">DFR</span>
                    </div>

                    {/* Royal Indian Elephant (Right side behind stamp photo) */}
                    <motion.div 
                      className="absolute bottom-8 -right-4 w-24 h-24 sm:bottom-10 sm:-right-6 sm:w-30 sm:h-30 md:w-36 md:h-36 pointer-events-none select-none z-10 mix-blend-multiply"
                      animate={testimonial.destination === "Jaipur" 
                        ? { rotate: [0, 1, -1, 0] } 
                        : { y: [0, -4, 0] }
                      }
                      transition={{ 
                        repeat: Infinity, 
                        duration: testimonial.destination === "Jaipur" ? 5 : 4, 
                        ease: "easeInOut" 
                      }}
                      style={isCardActive ? { x: illustrationParallaxX, y: illustrationParallaxY } : undefined}
                    >
                      <Image 
                        src={testimonial.collageImage} 
                        alt={`${testimonial.destination} regional artwork`}
                        fill
                        className="object-contain mix-blend-multiply" 
                      />
                    </motion.div>

                    {/* Secondary Illustration overlay (Traditional Indian Food Platter for Jaipur, blank/hidden for others) */}
                    {testimonial.secondaryCollage && (
                      <motion.div 
                        className="absolute -right-4 -bottom-4 w-20 h-15 sm:-right-6 sm:-bottom-6 sm:w-24 sm:h-18 md:w-30 md:h-22 pointer-events-none select-none z-10 mix-blend-multiply"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                        style={isCardActive ? { x: illustrationParallaxX, y: illustrationParallaxY } : undefined}
                      >
                        <Image 
                          src={testimonial.secondaryCollage} 
                          alt="Traditional Indian food thali" 
                          fill
                          className="object-contain mix-blend-multiply" 
                        />
                      </motion.div>
                    )}
                  </div>

                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom Pagination Dots, Play/Pause toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 sm:h-2 w-10 sm:w-12 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? "bg-[#8C202F]" : "bg-[#E5DAC9] hover:bg-[#CBB89A]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-primary/20 bg-[#F6EFE2] text-[#8C202F] hover:bg-primary/10 transition-colors active:scale-95 cursor-pointer shadow-sm"
            aria-label={isPlaying ? "Pause auto-scroll" : "Play auto-scroll"}
          >
            {isPlaying ? <Pause className="h-3 w-3 sm:h-4 sm:w-4" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />}
          </button>
        </div>

        {/* Drag / Gesture Label */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8C202F]/15 bg-[#F6EFE2] px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#8C202F] font-serif shadow-sm select-none">
            <svg className="w-4 h-4 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.553 1.553 0 0 1 2.23 0l3.72 3.72a.75.75 0 0 1-.22 1.25l-2.45.69v6.51c0 .83-.67 1.5-1.5 1.5h-2.18c-.83 0-1.5-.67-1.5-1.5v-3.75l-1.92-1.92a1.553 1.553 0 0 1 0-2.23l2.58-2.58a.75.75 0 0 1 1.25.22l.69 2.45v-4.36z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 12h4m-2-2v4M3 12h4M5 10v4" />
            </svg>
            <span>Drag or use arrows to explore more stories</span>
          </div>
        </div>

      </div>
    </section>
  )
}
