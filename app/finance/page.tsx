"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { FinanceOverview } from "@/components/finance/finance-overview"
import { PaymentEntry } from "@/components/finance/payment-entry"
import { InstallmentTracker } from "@/components/finance/installment-tracker"
import { useAuth } from "@/hooks/use-auth"

export default function FinancePage() {
  const { user } = useAuth()

  return (
    <AuthGuard allowedRoles={["admin", "finance"]}>
      <div className="flex h-screen bg-background">
        <Sidebar userRole={user?.role} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header title="Finance Management" user={user} />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <FinanceOverview />
              <div className="grid gap-6 lg:grid-cols-2">
                <PaymentEntry />
                <InstallmentTracker />
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
