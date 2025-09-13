
import type { Metadata } from "next"

// Fixed layout component for hubs routing
export const metadata: Metadata = {
  title: "Health Hubs | Geelong Movement Co",
  description: "Comprehensive guides to understanding and managing common movement and pain conditions.",
}

export default function HubsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
