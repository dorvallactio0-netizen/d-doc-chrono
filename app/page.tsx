"use client"

import { useState } from "react"
import { LayoutDashboard, FolderHeart, UserPlus, Users, Siren } from "lucide-react"
import { AppSidebar, type View } from "@/components/app-sidebar"
import { Topbar } from "@/components/topbar"
import { EmergencyBanner } from "@/components/emergency-banner"
import { StatCards } from "@/components/stat-cards"
import { MedicalRecords } from "@/components/medical-records"
import { NewPatientForm } from "@/components/new-patient-form"
import { WaitingQueue } from "@/components/waiting-queue"
import { EmergencyView } from "@/components/emergency-view"
import { PatientsProvider } from "@/components/patients-store"
import { cn } from "@/lib/utils" 
import BuyCarnetCard from "@/components/buy-carnet-card"



const mobileNav: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Accueil", icon: LayoutDashboard },
  { id: "records", label: "Dossiers", icon: FolderHeart },
  { id: "new", label: "Ajouter", icon: UserPlus },
  { id: "queue", label: "File", icon: Users },
  { id: "emergency", label: "Urgence", icon: Siren },
]

export default function Page() {
  const [view, setView] = useState<View>("dashboard")
  const [alertVisible, setAlertVisible] = useState(true)

  return (
    <PatientsProvider>
    <div className="flex h-dvh overflow-hidden bg-background">
      <AppSidebar active={view} onSelect={setView} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          view={view}
          onEmergency={() => {
            setView("emergency")
            setAlertVisible(true)
          }}
        />

        <main className="flex-1 space-y-6 overflow-y-auto p-4 pb-24 md:p-6 lg:pb-6">
          {alertVisible && view !== "emergency" && (
            <EmergencyBanner onDismiss={() => setAlertVisible(false)} />
          )}

          {view === "dashboard" && (
            <>
              <StatCards />
              <WaitingQueue limit={4} />
              <MedicalRecords />
            </>
          )}

          {view === "records" && <MedicalRecords />}
          {view === "new" && <NewPatientForm onCreated={() => setView("records")} />}
          {view === "queue" && <WaitingQueue />}
          {view === "emergency" && <EmergencyView />}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-card lg:hidden">
        {mobileNav.map((item) => {
          const Icon = item.icon
          const isActive = view === item.id
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <span className="relative">
                <Icon className="h-5 w-5" />
                {item.id === "emergency" && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-destructive" />
                )}
              </span>
              {item.label}
            </button>
          )
        })}
      <BuyCarnetCard />

 </div>
    </PatientsProvider>
  )
}
