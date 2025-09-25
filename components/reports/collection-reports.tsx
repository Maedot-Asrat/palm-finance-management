"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Download, Calendar, TrendingUp, Clock } from "lucide-react"

interface CollectionReportsProps {
  dateRange: string
  reportType: string
}

const collectionData = [
  { week: "Week 1", collected: 580000, target: 600000, efficiency: 96.7 },
  { week: "Week 2", collected: 620000, target: 600000, efficiency: 103.3 },
  { week: "Week 3", collected: 540000, target: 600000, efficiency: 90.0 },
  { week: "Week 4", collected: 660000, target: 600000, efficiency: 110.0 },
]

const collectionMethods = [
  { method: "Bank Transfer", amount: 1800000, percentage: 72, count: 145 },
  { method: "Check", amount: 450000, percentage: 18, count: 38 },
  { method: "Online Payment", amount: 200000, percentage: 8, count: 42 },
  { method: "Cash", amount: 50000, percentage: 2, count: 8 },
]

const topCollectors = [
  { name: "Sarah Johnson", collected: 125000, target: 120000, efficiency: 104.2 },
  { name: "Michael Chen", collected: 98000, target: 100000, efficiency: 98.0 },
  { name: "Emily Davis", collected: 87000, target: 90000, efficiency: 96.7 },
  { name: "Robert Wilson", collected: 76000, target: 80000, efficiency: 95.0 },
]

export function CollectionReports({ dateRange, reportType }: CollectionReportsProps) {
  const totalCollected = collectionData.reduce((sum, item) => sum + item.collected, 0)
  const totalTarget = collectionData.reduce((sum, item) => sum + item.target, 0)
  const avgEfficiency = collectionData.reduce((sum, item) => sum + item.efficiency, 0) / collectionData.length

  return (
    <div className="space-y-6">
      {/* Collection KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Collected</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{(totalCollected / 1000000).toFixed(1)}M ETB</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-green-500">+8.2% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Collection Efficiency</CardTitle>
            <Calendar className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{avgEfficiency.toFixed(1)}%</div>
            <div className="flex items-center gap-1 text-xs">
              <Badge variant="default" className="text-xs">
                Above Average
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">On-Time Collections</CardTitle>
            <Clock className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">87%</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">+3.2% improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Collection Time</CardTitle>
            <Clock className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">2.3 days</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-green-500">-0.5 days improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Collection Performance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Weekly Collection Performance</CardTitle>
              <CardDescription>Collections vs targets by week</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={collectionData}>
                <XAxis dataKey="week" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip
                  formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, ""]}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend />
                <Bar dataKey="collected" fill="hsl(var(--chart-1))" name="Collected" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="hsl(var(--chart-2))" name="Target" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Collection Methods */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Collection Methods</CardTitle>
              <CardDescription>Payment method breakdown</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {collectionMethods.map((method) => (
                <div key={method.method} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{method.method}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{method.count} transactions</span>
                      <span className="font-medium">{(method.amount / 1000).toFixed(0)}K ETB</span>
                    </div>
                  </div>
                  <Progress value={method.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{method.percentage}% of total</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top Performing Clients</CardTitle>
            <CardDescription>Clients with highest collection efficiency</CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCollectors.map((collector, index) => (
              <div key={collector.name} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{collector.name}</p>
                    <p className="text-sm text-muted-foreground">{collector.collected.toLocaleString()} ETB collected</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Badge variant={collector.efficiency >= 100 ? "default" : "secondary"} className="text-xs">
                      {collector.efficiency.toFixed(1)}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Target: {collector.target.toLocaleString()} ETB</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
