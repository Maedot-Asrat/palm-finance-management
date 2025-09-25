"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, DollarSign, TrendingUp, Users, AlertTriangle } from "lucide-react"

interface DashboardStatsProps {
  userRole?: string
}

export function DashboardStats({ userRole = "admin" }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Units",
      value: "248",
      change: "+12 this month",
      icon: Building2,
      color: "text-primary",
      roles: ["admin", "operations"],
    },
    {
      title: "Active Clients",
      value: "186",
      change: "+8 this month",
      icon: Users,
      color: "text-secondary",
      roles: ["admin", "operations"],
    },
    {
      title: "Monthly Collection",
      value: "ETB 2.4M",
      change: "+15.2% from last month",
      icon: DollarSign,
      color: "text-chart-1",
      roles: ["admin", "finance"],
    },
    {
      title: "Outstanding Balance",
      value: "ETB 890K",
      change: "-5.1% from last month",
      icon: TrendingUp,
      color: "text-chart-2",
      roles: ["admin", "finance"],
    },
    {
      title: "Overdue Payments",
      value: "23",
      change: "5 critical",
      icon: AlertTriangle,
      color: "text-destructive",
      roles: ["admin", "finance"],
      badge: "urgent",
    },
  ]

  const filteredStats = stats.filter((stat) => stat.roles.includes(userRole))

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {filteredStats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className="flex items-center gap-2">
              {stat.badge && (
                <Badge variant="destructive" className="text-xs">
                  {stat.badge}
                </Badge>
              )}
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
