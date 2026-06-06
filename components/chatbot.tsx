"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { packages, type Package } from "@/lib/data"
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  Star,
  MapPin,
  Clock,
} from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  suggestions?: string[]
  link?: { text: string; href: string }
  packages?: Package[]
}

const quickSuggestions = [
  "5 days Rajasthan trip under 20k",
  "Best honeymoon packages in Goa",
  "Adventure trip to Manali for 7 days",
  "Budget backpacking trip",
]

function generateResponse(query: string): Message {
  const queryLower = query.toLowerCase()

  // 1. Check for greetings
  if (queryLower.match(/^(hi|hello|hey|greetings|help)/)) {
    return {
      role: "assistant",
      content: "Hello! I'm TripBot, your AI Travel Advisor. Describe your dream trip—tell me where you want to go, your budget, duration, or travel style—and I'll recommend the perfect packages!",
      suggestions: quickSuggestions,
    }
  }

  // 2. Check for comparison page redirect queries
  if (queryLower.includes("compare") || queryLower.includes("comparison")) {
    return {
      role: "assistant",
      content: "Our comparison tool helps you compare packages side-by-side! You can compare prices, ratings, durations, and details easily.",
      link: { text: "Go to Compare Page", href: "/compare" },
    }
  }

  // 3. Intelligent Travel Advisor filtering logic
  let filtered = [...packages]
  let hasFilters = false

  // Filter by destination
  if (queryLower.includes("rajasthan")) {
    filtered = filtered.filter((p) => p.destination === "Rajasthan")
    hasFilters = true
  } else if (queryLower.includes("goa")) {
    filtered = filtered.filter((p) => p.destination === "Goa")
    hasFilters = true
  } else if (queryLower.includes("manali")) {
    filtered = filtered.filter((p) => p.destination === "Manali")
    hasFilters = true
  }

  // Filter by budget
  const budgetMatch = queryLower.match(/(\d+)k/i) || queryLower.match(/under\s*(\d+)/i)
  if (budgetMatch) {
    const amount = parseInt(budgetMatch[1])
    const maxBudget = amount < 1000 ? amount * 1000 : amount
    filtered = filtered.filter((p) => p.price <= maxBudget)
    hasFilters = true
  }

  // Filter by travel type
  if (queryLower.includes("honeymoon") || queryLower.includes("romantic")) {
    filtered = filtered.filter((p) => p.travelType === "Honeymoon" || p.travelType === "Luxury")
    hasFilters = true
  } else if (queryLower.includes("adventure") || queryLower.includes("trekking")) {
    filtered = filtered.filter((p) => p.travelType === "Adventure")
    hasFilters = true
  } else if (queryLower.includes("family")) {
    filtered = filtered.filter((p) => p.travelType === "Family")
    hasFilters = true
  } else if (queryLower.includes("luxury")) {
    filtered = filtered.filter((p) => p.travelType === "Luxury")
    hasFilters = true
  } else if (queryLower.includes("budget") || queryLower.includes("backpack")) {
    filtered = filtered.filter((p) => p.travelType === "Budget")
    hasFilters = true
  }

  // Filter by duration
  const durationMatch = queryLower.match(/(\d+)\s*days?/i)
  if (durationMatch) {
    const days = parseInt(durationMatch[1])
    filtered = filtered.filter((p) => Math.abs(p.durationDays - days) <= 2)
    hasFilters = true
  }

  // Return filtered packages if applicable
  if (hasFilters) {
    // Sort by rating & best deals
    filtered.sort((a, b) => {
      const scoreA = a.rating + (a.bestDeal ? 0.5 : 0) + (a.premium ? 0.3 : 0)
      const scoreB = b.rating + (b.bestDeal ? 0.5 : 0) + (b.premium ? 0.3 : 0)
      return scoreB - scoreA
    })

    const recommended = filtered.slice(0, 3)

    if (recommended.length === 0) {
      return {
        role: "assistant",
        content: "I couldn't find exact matches for your criteria. Here are some popular packages you might like instead:",
        packages: packages.slice(0, 3),
      }
    }

    return {
      role: "assistant",
      content: `I've found ${recommended.length} great option${recommended.length > 1 ? "s" : ""} matching your request:`,
      packages: recommended,
    }
  }

  // Default fallthrough response
  return {
    role: "assistant",
    content: "I'd be happy to help you find the perfect trip! Tell me where you want to go (e.g. Rajasthan, Goa, Manali), your budget, or your travel style.",
    suggestions: quickSuggestions,
  }
}

const getRecommendationLabel = (index: number) => {
  const labels = [
    { label: "Best Value", color: "bg-green-500/80 text-white" },
    { label: "Top Rated", color: "bg-amber-500/80 text-white" },
    { label: "Most Comfort", color: "bg-primary/80 text-white" },
  ]
  return labels[index] || labels[0]
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm TripBot, your AI Travel Advisor. Describe your dream trip and let our AI recommend the perfect packages!",
      suggestions: quickSuggestions,
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Listen for custom trigger event (e.g., from CTA section or navbar)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener("open-chatbot", handleOpen)
    return () => window.removeEventListener("open-chatbot", handleOpen)
  }, [])

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return

    setMessages((prev) => [...prev, { role: "user", content: text }])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = generateResponse(text)
    setMessages((prev) => [...prev, response])
    setIsTyping(false)
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center wax-seal text-primary-foreground shadow-lg border border-primary/20"
          >
            <MessageCircle className="h-8 w-8" />
            <span className="absolute -right-2 -top-2 flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-accent text-[10px] font-bold text-[#FAF4E8] ring-4 ring-background">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
            className="fixed bottom-8 right-8 z-50 w-[400px] max-w-[calc(100vw-4rem)] overflow-hidden rounded-[2.5rem] border border-primary/25 glass-dark shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-secondary to-[#2D080C] p-6 text-[#FAF4E8] border-b border-primary/20">
              <div className="flex items-center gap-4">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-md">
                  <Sparkles className="h-6 w-6 text-amber-400" />
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none font-serif text-amber-400">TripBot AI</h3>
                  <p className="mt-1 text-xs font-medium text-[#FAF4E8]/60">Travel Advisor Mode</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 transition-all hover:bg-white/10 hover:text-white hover:rotate-90 text-[#FAF4E8]/80"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[450px] overflow-y-auto p-6 scrollbar-hide">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/10 ${
                        message.role === "assistant"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-[#FAF4E8]/60"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <Bot className="h-5 w-5" />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] space-y-3 ${
                        message.role === "user" ? "text-right" : ""
                      }`}
                    >
                      <div
                        className={`inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          message.role === "assistant"
                            ? "bg-secondary/30 text-[#FAF4E8] border border-primary/20 font-medium"
                            : "bg-primary text-primary-foreground font-semibold"
                        }`}
                      >
                        {message.content}
                      </div>

                      {message.packages && message.packages.length > 0 && (
                        <div className="mt-3 space-y-3 text-left">
                          {message.packages.map((pkg, i) => {
                            const label = getRecommendationLabel(i)
                            return (
                              <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="overflow-hidden rounded-2xl border border-primary/20 bg-secondary/25 hover:bg-secondary/40 transition-all shadow-md flex flex-col"
                              >
                                <div className="relative h-28 w-full">
                                  <img
                                    src={pkg.image}
                                    alt={pkg.name}
                                    className="h-full w-full object-cover"
                                  />
                                  <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold ${label.color}`}>
                                    {label.label}
                                  </span>
                                  <div className="absolute right-2 top-2 rounded-lg bg-black/60 px-2 py-0.5 text-[10px] font-bold text-[#FAF4E8] flex items-center gap-0.5">
                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    <span>{pkg.rating}</span>
                                  </div>
                                </div>
                                <div className="p-3">
                                  <h4 className="font-bold text-sm text-[#FAF4E8] line-clamp-1">{pkg.name}</h4>
                                  <p className="text-[10px] text-[#FAF4E8]/60 mb-2">by {pkg.company.name}</p>
                                  
                                  <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] text-[#FAF4E8]/70">
                                    <span className="flex items-center gap-0.5">
                                      <MapPin className="h-3 w-3 shrink-0" />
                                      {pkg.destination}
                                    </span>
                                    <span className="flex items-center gap-0.5">
                                      <Clock className="h-3 w-3 shrink-0" />
                                      {pkg.duration}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between pt-1 border-t border-primary/10">
                                    <div>
                                      <span className="text-sm font-bold text-amber-400">
                                        ₹{pkg.price.toLocaleString()}
                                      </span>
                                      {pkg.originalPrice > pkg.price && (
                                        <span className="ml-1.5 text-[10px] text-[#FAF4E8]/50 line-through">
                                          ₹{pkg.originalPrice.toLocaleString()}
                                        </span>
                                      )}
                                    </div>
                                    <Link
                                      href={`/package/${pkg.id}`}
                                      onClick={() => setIsOpen(false)}
                                      className="rounded-lg bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-0.5"
                                    >
                                      <span>View</span>
                                      <ArrowRight className="h-3 w-3" />
                                    </Link>
                                  </div>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      )}

                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 justify-start">
                          {message.suggestions.map((suggestion) => (
                            <button
                              key={suggestion}
                              onClick={() => handleSubmit(suggestion)}
                              className="rounded-full bg-primary/20 px-4 py-2 text-xs font-bold text-primary-foreground border border-primary/30 transition-all hover:bg-primary/35 hover:border-primary/50 text-left"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      {message.link && (
                        <Link href={message.link.href} onClick={() => setIsOpen(false)}>
                          <div className="group mt-2 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/25 px-4 py-2.5 text-xs font-bold text-[#FAF4E8] transition-all hover:bg-primary/45 hover:text-primary-foreground">
                            {message.link.text}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-2xl bg-secondary/20 px-4 py-3 border border-primary/10">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Box */}
            <div className="p-6 pt-0">
               <div className="relative flex items-center gap-3 p-2 rounded-2xl bg-secondary/20 border border-primary/20 focus-within:border-primary/50 transition-colors">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleSubmit(input)
                      }
                    }}
                    placeholder="Describe your dream trip..."
                    className="flex-1 bg-transparent px-2 py-2 text-sm text-[#FAF4E8] placeholder:text-[#FAF4E8]/40 focus:outline-none"
                    disabled={isTyping}
                  />
                  <button
                    onClick={() => handleSubmit(input)}
                    disabled={isTyping || !input.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Send className="h-5 w-5" />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
