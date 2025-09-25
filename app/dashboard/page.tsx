"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentPayments } from "@/components/dashboard/recent-payments"
import { OverdueAlerts } from "@/components/dashboard/overdue-alerts"
import { CollectionChart } from "@/components/dashboard/collection-chart"
import { UnitStatusChart } from "@/components/dashboard/unit-status-chart"
import { useAuth } from "@/hooks/use-auth"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        <Sidebar userRole={user?.role} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header title="Dashboard" user={user} />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Stats Overview */}
              <DashboardStats userRole={user?.role} />

              {/* Charts Row */}
              <div className="grid gap-6 lg:grid-cols-2">
                <CollectionChart />
                <UnitStatusChart />
              </div>

              {/* Recent Activity Row */}
              <div className="grid gap-6 lg:grid-cols-2">
                <RecentPayments />
                <OverdueAlerts />
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
