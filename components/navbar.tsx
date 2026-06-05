"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Compare", href: "/compare" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [savedCount, setSavedCount] = useState(0)

  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem("saved-packages")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setSavedCount(Array.isArray(parsed) ? parsed.length : 0)
        } catch (e) {
          setSavedCount(0)
        }
      } else {
        setSavedCount(0)
      }
    }
    
    updateCount()
    window.addEventListener("saved-packages-updated", updateCount)
    window.addEventListener("storage", updateCount)
    return () => {
      window.removeEventListener("saved-packages-updated", updateCount)
      window.removeEventListener("storage", updateCount)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-6 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-4xl transition-all duration-500 will-change-transform",
      isScrolled ? "top-4 scale-95" : "top-6 scale-100"
    )}>
      <nav className="glass-navbar flex h-16 items-center justify-between rounded-full px-6 shadow-md transition-all hover:bg-primary/5">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="flex h-10 w-10 items-center justify-center wax-seal text-primary-foreground shadow-md"
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>
          <span className="hidden text-xl font-bold tracking-tight text-foreground sm:inline-block font-serif">
            TripCompare <span className="text-primary italic font-serif">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-all hover:text-primary",
                pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-foreground/70 hover:bg-primary/5"
              )}
            >
              {item.name}
              {pathname === item.href && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 z-[-1] rounded-full bg-primary/10"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="flex items-center gap-3">
          <Link href="/saved" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="relative text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-full">
              <Heart className="h-5 w-5" />
              {savedCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {savedCount}
                </span>
              )}
            </Button>
          </Link>
          <Button className="hidden sm:flex rounded-full bg-primary/5 hover:bg-primary/10 text-foreground border border-primary/20 font-semibold px-6 backdrop-blur-md">
            Login
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-primary/10 rounded-full">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full border-b border-primary/20 bg-background/95 text-foreground backdrop-blur-2xl">
              <div className="mt-12 flex flex-col gap-6 items-center">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-2xl font-semibold transition-all hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="w-full max-w-xs rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg">
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
