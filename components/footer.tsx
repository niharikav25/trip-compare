import Link from "next/link"
import { Sparkles, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Explore", href: "/explore" },
    { name: "Compare", href: "/compare" },
    { name: "Saved Trips", href: "/saved" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Blog", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-primary/15 bg-secondary/15 backdrop-blur-3xl">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center wax-seal text-primary-foreground shadow-md transition-transform group-hover:rotate-12">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground font-serif">
                TripCompare <span className="text-primary font-serif italic">AI</span>
              </span>
            </Link>
            <p className="mb-8 max-w-sm text-lg text-foreground/75 leading-relaxed">
              The next generation of travel comparison comparing packages from trusted companies with built-in AI intelligence.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-foreground/70 transition-all hover:bg-primary/10 hover:text-primary border border-primary/20">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-foreground/70 transition-all hover:bg-primary/10 hover:text-primary border border-primary/20">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-foreground/70 transition-all hover:bg-primary/10 hover:text-primary border border-primary/20">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground/50">Product</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 transition-all hover:text-primary hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground/50">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 transition-all hover:text-primary hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground/50">Support</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 transition-all hover:text-primary hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-primary/15 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/45">
          <p>&copy; {new Date().getFullYear()} TripCompare AI. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
