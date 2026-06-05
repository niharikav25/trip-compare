import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp } from "lucide-react"
import type { Review } from "@/lib/data"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={review.avatar}
                alt={review.user}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-foreground">{review.user}</div>
              <div className="text-sm text-muted-foreground">{review.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          {review.comment}
        </p>
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
          <ThumbsUp className="h-4 w-4" />
          <span>Helpful ({review.helpful})</span>
        </Button>
      </CardContent>
    </Card>
  )
}
