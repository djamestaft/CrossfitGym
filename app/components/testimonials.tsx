"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  location: string
  rating: number
  quote: string
  condition: string
  outcome: string
  timeframe: string
  image?: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Office Manager",
    location: "Geelong West",
    rating: 5,
    quote:
      "The FMS assessment completely changed how I approach exercise. I was struggling with chronic shoulder pain from years of desk work. The team identified specific movement patterns that were causing my issues and created a personalized program that actually worked.",
    condition: "Chronic shoulder pain",
    outcome: "Pain-free daily activities",
    timeframe: "6 weeks",
    image: "/testimonial-sarah.jpg",
  },
  {
    id: "2",
    name: "Mark Thompson",
    role: "Marathon Runner",
    location: "Newtown",
    rating: 5,
    quote:
      "After my back injury, I thought my running days were over. The GMC team not only got me back to running but helped me understand how to prevent future injuries. Their approach is professional, evidence-based, and genuinely caring.",
    condition: "Lower back injury",
    outcome: "Returned to marathon training",
    timeframe: "12 weeks",
    image: "/testimonial-mark.jpg",
  },
  {
    id: "3",
    name: "Jenny Liu",
    role: "New Mother",
    location: "Belmont",
    rating: 5,
    quote:
      "Pregnancy and childbirth left me with significant core weakness and back pain. The movement plan they created was perfect for my situation as a new mum - realistic, effective, and something I could do at home with my baby nearby.",
    condition: "Postpartum core weakness",
    outcome: "Regained core strength and confidence",
    timeframe: "8 weeks",
    image: "/testimonial-jenny.jpg",
  },
  {
    id: "4",
    name: "David Chen",
    role: "Tradesman",
    location: "Highton",
    rating: 5,
    quote:
      "Working in construction, my body takes a beating. The team taught me how to move properly and gave me exercises I could do on-site during breaks. My chronic hip pain is gone and I feel stronger than I have in years.",
    condition: "Hip pain from manual labor",
    outcome: "Pain-free work performance",
    timeframe: "10 weeks",
    image: "/testimonial-david.jpg",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    role: "Teacher",
    location: "Torquay",
    rating: 5,
    quote:
      "As a teacher, I'm on my feet all day and was developing knee problems. The FMS assessment revealed issues with my movement patterns that I never would have noticed. The corrective exercises have made such a difference.",
    condition: "Knee pain from prolonged standing",
    outcome: "Improved movement quality",
    timeframe: "7 weeks",
    image: "/testimonial-lisa.jpg",
  },
  {
    id: "6",
    name: "Robert Williams",
    role: "Retiree",
    location: "Ocean Grove",
    rating: 5,
    quote:
      "At 68, I thought stiffness and pain were just part of aging. The GMC team showed me that wasn't true. Their gentle approach and clear explanations helped me regain mobility I thought I'd lost forever. I'm now more active than I've been in decades.",
    condition: "Age-related stiffness and mobility loss",
    outcome: "Increased mobility and activity levels",
    timeframe: "16 weeks",
    image: "/testimonial-robert.jpg",
  },
]

interface TestimonialsProps {
  showAll?: boolean
  maxItems?: number
}

export function Testimonials({ showAll = false, maxItems = 3 }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, maxItems)

  useEffect(() => {
    if (!isAutoPlaying || showAll) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayedTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, displayedTestimonials.length, showAll])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayedTestimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayedTestimonials.length) % displayedTestimonials.length)
    setIsAutoPlaying(false)
  }

  if (showAll) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayedTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {displayedTestimonials.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="flex justify-center mt-6 gap-2">
            {displayedTestimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Quote className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-muted-foreground">
                {testimonial.role} • {testimonial.location}
              </p>
            </div>
          </div>

          <blockquote className="text-sm leading-relaxed italic">"{testimonial.quote}"</blockquote>

          <div className="grid grid-cols-1 gap-2 pt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Condition:</span>
              <Badge variant="outline" className="text-xs">
                {testimonial.condition}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Outcome:</span>
              <span className="text-xs font-medium text-primary">{testimonial.outcome}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Timeframe:</span>
              <span className="text-xs font-medium">{testimonial.timeframe}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
