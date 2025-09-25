"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { UnitManagement } from "@/components/units/unit-management"
import { useAuth } from "@/hooks/use-auth"

export default function UnitsPage() {
  const { user } = useAuth()

  return (
    <AuthGuard allowedRoles={["admin", "operations"]}>
      <div className="flex h-screen bg-background">
        <Sidebar userRole={user?.role} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header title="Unit Management" user={user} />
          <main className="flex-1 overflow-y-auto p-6">
            <UnitManagement />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
