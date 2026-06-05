import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TrustScore } from "@/components/trust-score"
import { ReviewCard } from "@/components/review-card"
import { PackageCard } from "@/components/package-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  MapPin,
  Calendar,
  Package,
  Users,
  Award,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react"
import { getCompanyById, getPackagesByCompany, reviews } from "@/lib/data"

export default async function CompanyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const company = getCompanyById(id)

  if (!company) {
    notFound()
  }

  const companyPackages = getPackagesByCompany(id)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-32 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              {/* Company Logo */}
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-card bg-card shadow-lg md:h-32 md:w-32">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Company Info */}
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {company.name}
                  </h1>
                  <Badge variant="secondary" className="gap-1 bg-green-100 text-green-700">
                    <Award className="h-3 w-3" />
                    Verified Partner
                  </Badge>
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {company.headquarters}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Est. {company.established}
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    {company.totalPackages} packages
                  </div>
                </div>

                <p className="max-w-2xl text-muted-foreground">{company.description}</p>
              </div>

              {/* Stats */}
              <div className="flex gap-4 md:flex-col">
                <Card className="border-border/50">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <span className="text-2xl font-bold">{company.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {company.reviewCount} reviews
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <TrustScore score={company.trustScore} size="sm" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="packages">
                <TabsList>
                  <TabsTrigger value="packages">Packages</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                </TabsList>

                {/* Packages Tab */}
                <TabsContent value="packages" className="mt-6">
                  {companyPackages.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {companyPackages.map((pkg) => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                      ))}
                    </div>
                  ) : (
                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <Package className="mb-4 h-12 w-12 text-muted-foreground" />
                        <h3 className="mb-2 font-semibold">No packages available</h3>
                        <p className="text-muted-foreground">
                          This company hasn&apos;t listed any packages yet.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </TabsContent>

                {/* About Tab */}
                <TabsContent value="about" className="mt-6">
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>About {company.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {company.description}
                      </p>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl bg-secondary/50 p-4">
                          <div className="mb-1 text-sm text-muted-foreground">
                            Headquarters
                          </div>
                          <div className="font-medium">{company.headquarters}</div>
                        </div>
                        <div className="rounded-xl bg-secondary/50 p-4">
                          <div className="mb-1 text-sm text-muted-foreground">
                            Established
                          </div>
                          <div className="font-medium">{company.established}</div>
                        </div>
                        <div className="rounded-xl bg-secondary/50 p-4">
                          <div className="mb-1 text-sm text-muted-foreground">
                            Total Packages
                          </div>
                          <div className="font-medium">{company.totalPackages}</div>
                        </div>
                        <div className="rounded-xl bg-secondary/50 p-4">
                          <div className="mb-1 text-sm text-muted-foreground">
                            Happy Travelers
                          </div>
                          <div className="font-medium">
                            {(company.reviewCount * 3).toLocaleString()}+
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-3 font-semibold">Why Choose Us</h4>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {[
                            "24/7 Customer Support",
                            "Best Price Guarantee",
                            "Verified Hotels & Transport",
                            "Flexible Cancellation",
                            "Expert Local Guides",
                            "Safe & Secure Booking",
                          ].map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-muted-foreground"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20 border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Contact {company.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Mail className="h-4 w-4" />
                    Send Inquiry
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Visit Website
                  </Button>

                  <div className="rounded-xl bg-secondary/50 p-4">
                    <h4 className="mb-2 text-sm font-medium">Quick Stats</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Response Time</span>
                        <span className="font-medium">Within 2 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Booking Rate</span>
                        <span className="font-medium">98%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Repeat Customers</span>
                        <span className="font-medium">45%</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/explore" className="block">
                    <Button variant="ghost" className="w-full gap-2 text-primary">
                      Browse All Packages
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
