"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Compare", href: "/compare" },
]

export function Navbar() {
  const pathname = usePathname()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [savedCount, setSavedCount] = useState(0)

  // Login states
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Load saved packages count & login state on mount
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
    
    const checkLogin = () => {
      const loggedIn = localStorage.getItem("user-logged-in") === "true"
      const storedEmail = localStorage.getItem("user-email") || ""
      setIsLoggedIn(loggedIn)
      setUserEmail(storedEmail)
    }
    
    updateCount()
    checkLogin()
    
    window.addEventListener("saved-packages-updated", updateCount)
    window.addEventListener("user-login-updated", checkLogin)
    window.addEventListener("storage", () => {
      updateCount()
      checkLogin()
    })
    
    return () => {
      window.removeEventListener("saved-packages-updated", updateCount)
      window.removeEventListener("user-login-updated", checkLogin)
      window.removeEventListener("storage", () => {
        updateCount()
        checkLogin()
      })
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Email is required")
      return
    }
    if (!password) {
      setError("Password is required")
      return
    }
    
    // Simulate successful login
    localStorage.setItem("user-logged-in", "true")
    localStorage.setItem("user-email", email)
    setIsLoggedIn(true)
    setUserEmail(email)
    setDialogOpen(false)
    
    toast({
      title: "Welcome back!",
      description: `Successfully logged in as ${email}.`,
    })

    // Reset fields
    setEmail("")
    setPassword("")
    setError("")
    
    // Trigger event for cross-component updates
    window.dispatchEvent(new Event("user-login-updated"))
  }

  const handleLogout = () => {
    localStorage.removeItem("user-logged-in")
    localStorage.removeItem("user-email")
    setIsLoggedIn(false)
    setUserEmail("")
    
    toast({
      title: "Logged out",
      description: "You have been logged out of your account.",
    })
    
    window.dispatchEvent(new Event("user-login-updated"))
  }

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
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-primary/20 shadow-sm p-0 focus-visible:ring-0">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-[#5E121E] text-primary-foreground font-serif font-bold text-sm">
                      {userEmail ? userEmail.slice(0, 2).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background/95 border border-primary/10 shadow-lg rounded-xl mt-2 p-1" align="end">
                <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground px-3 py-2 border-b border-border/40">
                  Logged in as <div className="text-sm font-bold text-foreground truncate mt-0.5">{userEmail}</div>
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/saved" className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg hover:bg-primary/5 cursor-pointer">
                    <Heart className="h-4 w-4 text-primary" />
                    My Saved Packages
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/compare" className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg hover:bg-primary/5 cursor-pointer">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Compare Tool
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/40 my-1" />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg text-destructive hover:bg-destructive/5 hover:text-destructive cursor-pointer">
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => setDialogOpen(true)}
              className="hidden sm:flex rounded-full bg-primary/5 hover:bg-primary/10 text-foreground border border-primary/20 font-semibold px-6 backdrop-blur-md"
            >
              Login
            </Button>
          )}

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
                
                {isLoggedIn ? (
                  <>
                    <div className="text-sm font-medium text-muted-foreground border-t border-primary/10 pt-4 w-full text-center">
                      Logged in as <span className="font-semibold text-foreground">{userEmail}</span>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        handleLogout()
                        setOpen(false)
                      }}
                      className="w-full max-w-xs rounded-full border-primary/20 hover:bg-primary/5 py-6 text-lg font-semibold"
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => {
                      setOpen(false)
                      setDialogOpen(true)
                    }}
                    className="w-full max-w-xs rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-bold"
                  >
                    Login / Get Started
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Global Client-Side Login Dialog Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-background/95 border border-primary/20 shadow-xl rounded-2xl backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold text-primary text-center">
              TripCompare AI Login
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium text-foreground">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border/60 bg-muted/30 focus:border-primary/50 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium text-foreground">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-border/60 bg-muted/30 focus:border-primary/50 rounded-xl"
              />
            </div>
            {error && <p className="text-xs text-destructive font-medium">{error}</p>}
            <Button type="submit" className="w-full font-bold py-6 rounded-full shadow-md mt-4">
              Log In
            </Button>
            <div className="text-center text-xs text-muted-foreground mt-4 pt-2 border-t border-border/40">
              Demo login. Enter any email & password.
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  )
}
