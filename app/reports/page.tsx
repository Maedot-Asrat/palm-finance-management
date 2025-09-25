"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ReportsOverview } from "@/components/reports/reports-overview"
import { useAuth } from "@/hooks/use-auth"

export default function ReportsPage() {
  const { user } = useAuth()

  return (
    <AuthGuard allowedRoles={["admin", "finance"]}>
      <div className="flex h-screen bg-background">
        <Sidebar userRole={user?.role} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header title="Reports & Analytics" user={user} />
          <main className="flex-1 overflow-y-auto p-6">
            <ReportsOverview />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
