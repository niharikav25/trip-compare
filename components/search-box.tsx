"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { MapPin, Wallet, Calendar, Search } from "lucide-react"

export function SearchBox() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [budget, setBudget] = useState("")
  const [duration, setDuration] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (destination) params.set("destination", destination)
    if (budget) params.set("budget", budget)
    if (duration) params.set("duration", duration)
    router.push(`/explore?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-card p-3 border-2 border-double border-primary/40 shadow-lg md:p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
        {/* Destination Input */}
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/60" />
          <Input
            placeholder="Where do you want to go?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="h-12 border border-primary/15 bg-background/80 pl-10 text-base focus-visible:ring-1 focus-visible:ring-primary/60 text-foreground placeholder:text-foreground/45"
          />
        </div>

        {/* Budget Select */}
        <div className="relative md:w-44">
          <Wallet className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-foreground/60" />
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger className="h-12 border border-primary/15 bg-background/80 pl-10 text-base text-foreground focus:ring-1 focus:ring-primary/60">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-primary/20 text-foreground">
              <SelectItem value="10000">Under ₹10,000</SelectItem>
              <SelectItem value="20000">₹10,000 - ₹20,000</SelectItem>
              <SelectItem value="30000">₹20,000 - ₹30,000</SelectItem>
              <SelectItem value="50000">₹30,000 - ₹50,000</SelectItem>
              <SelectItem value="100000">Above ₹50,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Duration Select */}
        <div className="relative md:w-44">
          <Calendar className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-foreground/60" />
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="h-12 border border-primary/15 bg-background/80 pl-10 text-base text-foreground focus:ring-1 focus:ring-primary/60">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-primary/20 text-foreground">
              <SelectItem value="3">1-3 Days</SelectItem>
              <SelectItem value="5">4-5 Days</SelectItem>
              <SelectItem value="7">6-7 Days</SelectItem>
              <SelectItem value="10">8+ Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button onClick={handleSearch} size="lg" className="h-12 gap-2 px-8 bg-primary text-primary-foreground hover:bg-primary/95 transition-all font-semibold rounded-xl">
          <Search className="h-5 w-5" />
          <span>Compare Now</span>
        </Button>
      </div>
    </div>
  )
}
