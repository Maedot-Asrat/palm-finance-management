"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ClientManagement } from "@/components/clients/client-management"
import { useAuth } from "@/hooks/use-auth"

export default function ClientsPage() {
  const { user } = useAuth()

  return (
    <AuthGuard allowedRoles={["admin", "operations"]}>
      <div className="flex h-screen bg-background">
        <Sidebar userRole={user?.role} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header title="Client Management" user={user} />
          <main className="flex-1 overflow-y-auto p-6">
            <ClientManagement />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
