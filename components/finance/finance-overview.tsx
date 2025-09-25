"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, AlertTriangle, Calendar } from "lucide-react"

export function FinanceOverview() {
  const stats = [
    {
      title: "Today's Collections",
      value: "ETB 125,500", // Updated currency from $ to ETB
      change: "+8.2% from yesterday",
      icon: DollarSign,
      color: "text-chart-1",
    },
    {
      title: "This Month",
      value: "ETB 2.4M", // Updated currency from $ to ETB
      change: "+15.2% from last month",
      icon: TrendingUp,
      color: "text-chart-2",
    },
    {
      title: "Pending Installments",
      value: "47",
      change: "Due this week",
      icon: Calendar,
      color: "text-chart-3",
    },
    {
      title: "Overdue Amount",
      value: "ETB 890K", // Updated currency from $ to ETB
      change: "23 accounts",
      icon: AlertTriangle,
      color: "text-destructive",
      badge: "urgent",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
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
