import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Activity, Users, Clock, CheckCircle, Star, Calendar } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mb-4">
              Geelong's Movement Specialists
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-balance">
              Train Around Pain, <span className="text-emerald-600">Move Freely Again</span>
            </h1>
            <p className="text-xl text-slate-600 text-balance max-w-3xl mx-auto">
              Professional movement therapy and functional movement screening in Geelong. Expert physiotherapy and
              exercise rehabilitation to help you move without limitations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/fms">
                  Get Your Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-slate-500">✓ No obligation ✓ 45-minute comprehensive evaluation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">How We Help You Move Better</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our evidence-based approach identifies your unique movement patterns and creates personalized solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border border-slate-200">
              <CardContent className="pt-8">
                <Activity className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-slate-900">Functional Movement Screen</h3>
                <p className="text-slate-600 mb-6">
                  Comprehensive 7-point assessment to identify movement limitations and injury risks.
                </p>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                  asChild
                >
                  <Link href="/fms">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border border-slate-200">
              <CardContent className="pt-8">
                <Users className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-slate-900">Personalized Therapy</h3>
                <p className="text-slate-600 mb-6">
                  One-on-one treatment plans tailored to your specific needs and goals.
                </p>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                  asChild
                >
                  <Link href="/timetable">
                    View Schedule
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border border-slate-200">
              <CardContent className="pt-8">
                <Clock className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-slate-900">Ongoing Support</h3>
                <p className="text-slate-600 mb-6">
                  Access to movement resources and ongoing guidance through our member portal.
                </p>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                  asChild
                >
                  <Link href="/portal">
                    Member Portal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Trusted by 500+ Geelong Residents</h2>
            <div className="flex justify-center items-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <span className="text-slate-600">4.9/5 from 127 reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border border-slate-200">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <p className="text-sm mb-4 text-slate-700">
                  "The team at GMC completely transformed my approach to fitness. No more shoulder pain during
                  workouts!"
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Sarah Mitchell</p>
                  <p className="text-slate-600">Office Manager</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <p className="text-sm mb-4 text-slate-700">
                  "Professional, caring, and incredibly knowledgeable. They helped me get back to running after my back
                  injury."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Mark Thompson</p>
                  <p className="text-slate-600">Marathon Runner</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <p className="text-sm mb-4 text-slate-700">
                  "The FMS assessment was eye-opening. The personalized plan has made such a difference to my daily
                  comfort."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Jenny Liu</p>
                  <p className="text-slate-600">New Mother</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access to Timetable */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-emerald-gradient border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                      <Calendar className="h-6 w-6 text-white" />
                      <h3 className="text-2xl font-bold text-white">View Our Class Schedule</h3>
                    </div>
                    <p className="text-white">
                      Check availability and book your spot in our movement classes and workshops.
                    </p>
                  </div>
                  <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-slate-50" asChild>
                    <Link href="/timetable">
                      View Timetable
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-slate-900">Ready to Move Without Limitations?</h2>
            <p className="text-xl text-slate-600">
              Book your free Functional Movement Screen assessment today. Our team will contact you within 1 business
              day.
            </p>
            <div className="space-y-4">
              <Button size="lg" className="text-lg px-8 bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/fms">
                  Book Your Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="flex justify-center items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  No obligation
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  45-minute assessment
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  Personalized plan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
