import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TrustScore } from "@/components/trust-score"
import { ReviewCard } from "@/components/review-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  MapPin,
  Clock,
  Heart,
  Share2,
  Check,
  X,
  Car,
  Utensils,
  Hotel,
  Calendar,
  ArrowRight,
  Building2,
} from "lucide-react"
import { getPackageById, reviews } from "@/lib/data"

export default async function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pkg = getPackageById(id)

  if (!pkg) {
    notFound()
  }

  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28">
        {/* Image Gallery */}
        <section className="bg-[#FAF0E1]/80 border-b border-primary/10 shadow-xs">
          <div className="container mx-auto px-4 py-6">
            <div className="grid gap-4 h-[240px] sm:h-[300px] md:h-[340px] grid-cols-1 md:grid-cols-3">
              <div className="relative h-full md:col-span-2 overflow-hidden rounded-2xl border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={pkg.images[0]}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                  priority
                />
                {pkg.bestDeal && (
                  <Badge className="absolute left-4 top-4 bg-emerald-700 text-white font-bold px-3 py-1 shadow-sm">
                    Best Deal
                  </Badge>
                )}
                {pkg.premium && (
                  <Badge className="absolute left-4 top-4 bg-amber-600 text-white font-bold px-3 py-1 shadow-sm">
                    Premium
                  </Badge>
                )}
              </div>
              <div className="hidden md:flex flex-col gap-4 h-full">
                {pkg.images.slice(1, 3).map((image, i) => (
                  <div
                    key={i}
                    className="relative flex-1 overflow-hidden rounded-2xl border border-primary/10 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Image src={image} alt={`${pkg.name} ${i + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/15 border border-primary/15 font-semibold text-xs py-1 px-3.5 tracking-wider uppercase rounded-full">
                    {pkg.travelType}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-muted/60 px-3.5 py-1 rounded-full border border-primary/5">
                    <MapPin className="h-4 w-4 text-primary/75" />
                    {pkg.destination}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-muted/60 px-3.5 py-1 rounded-full border border-primary/5">
                    <Clock className="h-4 w-4 text-primary/75" />
                    {pkg.duration}
                  </div>
                </div>
                <h1 className="mb-3 font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                  {pkg.name}
                </h1>
                <div className="flex flex-wrap items-center gap-5 text-sm">
                  <Link
                    href={`/company/${pkg.company.id}`}
                    className="flex items-center gap-2 font-medium text-muted-foreground hover:text-primary transition-colors bg-muted/30 hover:bg-muted/70 px-3.5 py-1.5 rounded-xl border border-primary/5"
                  >
                    <Building2 className="h-4 w-4 text-primary/75" />
                    by <span className="font-semibold text-foreground">{pkg.company.name}</span>
                  </Link>
                  <div className="flex items-center gap-1.5 bg-amber-50/70 border border-amber-200/50 px-3.5 py-1.5 rounded-xl">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-amber-950">{pkg.rating}</span>
                    <span className="text-xs text-amber-800 font-medium">
                      ({pkg.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-8 flex flex-wrap gap-2.5">
                {pkg.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="font-serif italic text-sm font-semibold tracking-wide bg-muted/60 text-primary border border-primary/15 rounded-lg px-3.5 py-1.5 shadow-xs"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Tabs */}
              <Tabs defaultValue="itinerary" className="mb-8">
                <TabsList className="w-full justify-start bg-muted/65 border border-border/50 p-1 rounded-xl">
                  <TabsTrigger 
                    value="itinerary"
                    className="rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xs"
                  >
                    Itinerary
                  </TabsTrigger>
                  <TabsTrigger 
                    value="hotels"
                    className="rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xs"
                  >
                    Hotels
                  </TabsTrigger>
                  <TabsTrigger 
                    value="inclusions"
                    className="rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xs"
                  >
                    Inclusions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews"
                    className="rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xs"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                {/* Itinerary Tab */}
                <TabsContent value="itinerary" className="mt-6">
                  <div className="relative space-y-0">
                    {pkg.itinerary.map((day, index) => (
                      <div key={day.day} className="relative pb-8 pl-8">
                        {/* Timeline line */}
                        {index < pkg.itinerary.length - 1 && (
                          <div className="absolute left-[13px] top-8 h-full w-0.5 border-l-2 border-dashed border-primary/25" />
                        )}
                        {/* Timeline dot (styled like wax seal stamp) */}
                        <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#5E121E] text-xs font-bold text-primary-foreground shadow-sm ring-4 ring-background z-10">
                          {day.day}
                        </div>
                        <Card className="border-border/60 bg-card/30 hover:bg-card/50 transition-colors shadow-xs">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{day.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {day.description}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-1.5">
                              {day.activities.map((activity, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Hotels Tab */}
                <TabsContent value="hotels" className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {pkg.hotels.map((hotel, index) => (
                      <Card key={index} className="border-border/60 bg-card/35 hover:bg-card/55 transition-all shadow-xs hover:shadow-sm">
                        <CardContent className="p-5">
                          <div className="mb-3 flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                                <Hotel className="h-4 w-4 text-primary/70 shrink-0" />
                                {hotel.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-muted-foreground/70" />
                                {hotel.location}
                              </p>
                            </div>
                            <div className="flex items-center gap-0.5 shrink-0 bg-amber-50/80 px-2 py-1 rounded-lg border border-amber-200/50">
                              {Array.from({ length: hotel.stars }).map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-3 w-3 fill-amber-400 text-amber-400"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/5 w-fit px-3 py-1.5 rounded-full border border-primary/10">
                            <Clock className="h-3.5 w-3.5" />
                            {hotel.nights} night{hotel.nights > 1 ? "s" : ""} stay
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Inclusions Tab */}
                <TabsContent value="inclusions" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-emerald-800/20 bg-emerald-50/20 shadow-xs">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-emerald-800 font-serif text-xl font-bold">
                          <Check className="h-5 w-5 text-emerald-700" />
                          Inclusions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2.5">
                          {pkg.inclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/20 bg-primary/5 shadow-xs">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary font-serif text-xl font-bold">
                          <X className="h-5 w-5 text-primary" />
                          Exclusions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2.5">
                          {pkg.exclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
                              <X className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-border/60 bg-card/75 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Price */}
                  <div className="mb-6 bg-background/50 border border-primary/5 rounded-xl p-4 shadow-xs">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-primary">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-base text-muted-foreground line-through font-medium">
                        ₹{pkg.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-primary/5">
                      <span className="text-xs text-muted-foreground font-medium">per person</span>
                      <Badge variant="secondary" className="bg-emerald-800/10 text-emerald-800 border border-emerald-800/25 font-bold shadow-xs px-2.5 py-0.5 rounded">
                        {discount}% OFF
                      </Badge>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-muted/70 border border-primary/5 p-3.5 shadow-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Car className="h-4 w-4 text-primary/75" />
                        <span className="text-xs font-semibold">Transport</span>
                      </div>
                      <p className="mt-1.5 text-sm font-bold text-foreground">{pkg.transport}</p>
                    </div>
                    <div className="rounded-xl bg-muted/70 border border-primary/5 p-3.5 shadow-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Utensils className="h-4 w-4 text-primary/75" />
                        <span className="text-xs font-semibold">Meals</span>
                      </div>
                      <p className="mt-1.5 text-sm font-bold text-foreground">{pkg.meals}</p>
                    </div>
                  </div>

                  {/* Trust Score */}
                  <div className="mb-6 rounded-xl bg-muted/70 border border-primary/5 p-4 shadow-xs">
                    <TrustScore score={pkg.company.trustScore} />
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full gap-2 font-bold shadow-sm" size="lg">
                      <Calendar className="h-4 w-4" />
                      Book Now
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 gap-2 font-semibold">
                        <Heart className="h-4 w-4 text-primary/80" />
                        Save
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2 font-semibold">
                        <Share2 className="h-4 w-4 text-primary/80" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Company Link */}
                  <Link
                    href={`/company/${pkg.company.id}`}
                    className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                  >
                    View more from {pkg.company.name}
                    <ArrowRight className="h-4 w-4" />
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
