"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, MapPin, Users, AlertCircle, Calendar, RefreshCw } from "lucide-react"

interface ClassSession {
  id: string
  title: string
  instructor: string
  time: string
  duration: number
  capacity: number
  booked: number
  location: string
  type: "group" | "individual" | "assessment"
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels"
}

interface DaySchedule {
  date: string
  dayName: string
  sessions: ClassSession[]
}

// Mock Fitbox data - in real implementation, this would come from Fitbox API
const mockFitboxData: DaySchedule[] = [
  {
    date: "2024-01-22",
    dayName: "Monday",
    sessions: [
      {
        id: "1",
        title: "Movement Fundamentals",
        instructor: "Dr. Sarah Mitchell",
        time: "07:00",
        duration: 60,
        capacity: 8,
        booked: 6,
        location: "Studio 1",
        type: "group",
        level: "All Levels",
      },
      {
        id: "2",
        title: "FMS Assessment",
        instructor: "Dr. Mark Thompson",
        time: "09:00",
        duration: 45,
        capacity: 1,
        booked: 0,
        location: "Assessment Room",
        type: "assessment",
        level: "All Levels",
      },
      {
        id: "3",
        title: "Core Stability Class",
        instructor: "Dr. Sarah Mitchell",
        time: "12:00",
        duration: 45,
        capacity: 10,
        booked: 8,
        location: "Studio 1",
        type: "group",
        level: "Intermediate",
      },
      {
        id: "4",
        title: "Individual Consultation",
        instructor: "Dr. Mark Thompson",
        time: "14:00",
        duration: 60,
        capacity: 1,
        booked: 1,
        location: "Consultation Room",
        type: "individual",
        level: "All Levels",
      },
      {
        id: "5",
        title: "Shoulder Rehab Workshop",
        instructor: "Dr. Sarah Mitchell",
        time: "17:30",
        duration: 75,
        capacity: 6,
        booked: 4,
        location: "Studio 2",
        type: "group",
        level: "Beginner",
      },
    ],
  },
  {
    date: "2024-01-23",
    dayName: "Tuesday",
    sessions: [
      {
        id: "6",
        title: "Back Pain Solutions",
        instructor: "Dr. Mark Thompson",
        time: "08:00",
        duration: 60,
        capacity: 8,
        booked: 7,
        location: "Studio 1",
        type: "group",
        level: "All Levels",
      },
      {
        id: "7",
        title: "FMS Assessment",
        instructor: "Dr. Sarah Mitchell",
        time: "10:30",
        duration: 45,
        capacity: 1,
        booked: 1,
        location: "Assessment Room",
        type: "assessment",
        level: "All Levels",
      },
      {
        id: "8",
        title: "Advanced Movement",
        instructor: "Dr. Mark Thompson",
        time: "18:00",
        duration: 60,
        capacity: 6,
        booked: 5,
        location: "Studio 2",
        type: "group",
        level: "Advanced",
      },
    ],
  },
  {
    date: "2024-01-24",
    dayName: "Wednesday",
    sessions: [
      {
        id: "9",
        title: "Movement Fundamentals",
        instructor: "Dr. Sarah Mitchell",
        time: "07:00",
        duration: 60,
        capacity: 8,
        booked: 5,
        location: "Studio 1",
        type: "group",
        level: "All Levels",
      },
      {
        id: "10",
        title: "Individual Consultation",
        instructor: "Dr. Mark Thompson",
        time: "11:00",
        duration: 60,
        capacity: 1,
        booked: 0,
        location: "Consultation Room",
        type: "individual",
        level: "All Levels",
      },
      {
        id: "11",
        title: "Posture & Ergonomics",
        instructor: "Dr. Sarah Mitchell",
        time: "13:00",
        duration: 45,
        capacity: 12,
        booked: 9,
        location: "Studio 1",
        type: "group",
        level: "Beginner",
      },
    ],
  },
  {
    date: "2024-01-25",
    dayName: "Thursday",
    sessions: [
      {
        id: "12",
        title: "Core Stability Class",
        instructor: "Dr. Mark Thompson",
        time: "08:30",
        duration: 45,
        capacity: 10,
        booked: 8,
        location: "Studio 1",
        type: "group",
        level: "Intermediate",
      },
      {
        id: "13",
        title: "FMS Assessment",
        instructor: "Dr. Sarah Mitchell",
        time: "15:00",
        duration: 45,
        capacity: 1,
        booked: 0,
        location: "Assessment Room",
        type: "assessment",
        level: "All Levels",
      },
      {
        id: "14",
        title: "Hip Mobility Workshop",
        instructor: "Dr. Mark Thompson",
        time: "17:00",
        duration: 75,
        capacity: 8,
        booked: 6,
        location: "Studio 2",
        type: "group",
        level: "All Levels",
      },
    ],
  },
  {
    date: "2024-01-26",
    dayName: "Friday",
    sessions: [
      {
        id: "15",
        title: "Movement Fundamentals",
        instructor: "Dr. Sarah Mitchell",
        time: "07:00",
        duration: 60,
        capacity: 8,
        booked: 7,
        location: "Studio 1",
        type: "group",
        level: "All Levels",
      },
      {
        id: "16",
        title: "Individual Consultation",
        instructor: "Dr. Mark Thompson",
        time: "09:30",
        duration: 60,
        capacity: 1,
        booked: 1,
        location: "Consultation Room",
        type: "individual",
        level: "All Levels",
      },
      {
        id: "17",
        title: "Weekend Warrior Prep",
        instructor: "Dr. Sarah Mitchell",
        time: "16:00",
        duration: 60,
        capacity: 10,
        booked: 8,
        location: "Studio 1",
        type: "group",
        level: "Intermediate",
      },
    ],
  },
  {
    date: "2024-01-27",
    dayName: "Saturday",
    sessions: [
      {
        id: "18",
        title: "Saturday Morning Movement",
        instructor: "Dr. Mark Thompson",
        time: "09:00",
        duration: 75,
        capacity: 12,
        booked: 10,
        location: "Studio 1",
        type: "group",
        level: "All Levels",
      },
      {
        id: "19",
        title: "FMS Assessment",
        instructor: "Dr. Sarah Mitchell",
        time: "11:30",
        duration: 45,
        capacity: 1,
        booked: 0,
        location: "Assessment Room",
        type: "assessment",
        level: "All Levels",
      },
    ],
  },
  {
    date: "2024-01-28",
    dayName: "Sunday",
    sessions: [
      {
        id: "20",
        title: "Gentle Movement & Recovery",
        instructor: "Dr. Sarah Mitchell",
        time: "10:00",
        duration: 60,
        capacity: 8,
        booked: 6,
        location: "Studio 2",
        type: "group",
        level: "Beginner",
      },
    ],
  },
]

// CMS fallback data
const cmsFallbackData: DaySchedule[] = [
  {
    date: "2024-01-22",
    dayName: "Monday",
    sessions: [
      {
        id: "cms-1",
        title: "Morning Movement Session",
        instructor: "GMC Team",
        time: "07:00",
        duration: 60,
        capacity: 8,
        booked: 0,
        location: "Studio 1",
        type: "group",
        level: "All Levels",
      },
      {
        id: "cms-2",
        title: "Assessment Appointments",
        instructor: "GMC Team",
        time: "09:00",
        duration: 45,
        capacity: 4,
        booked: 0,
        location: "Assessment Room",
        type: "assessment",
        level: "All Levels",
      },
    ],
  },
]

export function Timetable() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([])
  const [selectedDay, setSelectedDay] = useState<string>("All")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<"fitbox" | "cms">("fitbox")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Simulate fetching data from Fitbox API
  const fetchTimetableData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate occasional API failures for demo
      const shouldFail = Math.random() < 0.2 // 20% chance of failure

      if (shouldFail) {
        throw new Error("Fitbox API temporarily unavailable")
      }

      setSchedule(mockFitboxData)
      setDataSource("fitbox")
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Fitbox API error:", error)
      setError("Unable to load live timetable data")
      // Fallback to CMS data
      setSchedule(cmsFallbackData)
      setDataSource("cms")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTimetableData()
  }, [])

  const filteredSchedule = selectedDay === "All" ? schedule : schedule.filter((day) => day.dayName === selectedDay)

  const dayNames = ["All", ...Array.from(new Set(schedule.map((day) => day.dayName)))]

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case "assessment":
        return "bg-primary text-primary-foreground"
      case "individual":
        return "bg-secondary text-secondary-foreground"
      case "group":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getAvailabilityStatus = (session: ClassSession) => {
    const available = session.capacity - session.booked
    if (available === 0) return { text: "Full", color: "text-destructive" }
    if (available <= 2) return { text: `${available} spots left`, color: "text-orange-600" }
    return { text: `${available} available`, color: "text-primary" }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex gap-2">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-20" />
          ))}
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Class Timetable</h2>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleString()} •{" "}
            <span className={dataSource === "fitbox" ? "text-primary" : "text-orange-600"}>
              {dataSource === "fitbox" ? "Live from Fitbox" : "CMS Fallback"}
            </span>
          </p>
        </div>
        <Button variant="outline" onClick={fetchTimetableData} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}. Showing backup schedule from our content management system.</AlertDescription>
        </Alert>
      )}

      {/* Important Notes */}
      <Alert>
        <Calendar className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> All times shown in AEDT (Australian Eastern Daylight Time). Public holiday
          schedules may vary. Please call (03) 5234 5678 to confirm availability or book appointments.
        </AlertDescription>
      </Alert>

      {/* Day Filter */}
      <div className="flex flex-wrap gap-2">
        {dayNames.map((day) => (
          <Button
            key={day}
            variant={selectedDay === day ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </Button>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="space-y-6">
        {filteredSchedule.map((day) => (
          <Card key={day.date}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {day.dayName}, {new Date(day.date).toLocaleDateString("en-AU", { month: "long", day: "numeric" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {day.sessions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No classes scheduled for this day</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {day.sessions.map((session) => {
                    const availability = getAvailabilityStatus(session)
                    return (
                      <Card key={session.id} className="border-l-4 border-l-primary">
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-sm leading-tight">{session.title}</h3>
                              <Badge className={`text-xs ${getSessionTypeColor(session.type)}`}>
                                {session.type === "assessment" ? "Assessment" : session.type}
                              </Badge>
                            </div>

                            <div className="space-y-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {session.time} ({session.duration} min)
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-3 w-3" />
                                <span>{session.instructor}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                <span>{session.location}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {session.level}
                              </Badge>
                              <span className={`text-xs font-medium ${availability.color}`}>{availability.text}</span>
                            </div>

                            {session.type === "assessment" && (
                              <Button size="sm" className="w-full text-xs" asChild>
                                <a href="/fms">Book Assessment</a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchedule.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No classes found</h3>
          <p className="text-muted-foreground">Try selecting a different day or refresh the timetable.</p>
        </div>
      )}

      {/* Footer Info */}
      <Card className="bg-muted">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Booking Information</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• FMS Assessments can be booked online</li>
                <li>• Group classes require advance booking</li>
                <li>• Individual consultations by appointment only</li>
                <li>• 24-hour cancellation policy applies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact Details</h4>
              <div className="space-y-1 text-muted-foreground">
                <p>Phone: (03) 5234 5678</p>
                <p>Email: info@geelongmovement.com</p>
                <p>Address: 123 Movement St, Geelong VIC 3220</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
