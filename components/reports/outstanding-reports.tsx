"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts"
import { Download, AlertTriangle, Clock, Phone, DollarSign } from "lucide-react"

interface OutstandingReportsProps {
  dateRange: string
  reportType: string
}

const agingData = [
  { range: "0-30 days", amount: 250000, count: 15, color: "hsl(var(--chart-1))" },
  { range: "31-60 days", amount: 180000, count: 12, color: "hsl(var(--chart-2))" },
  { range: "61-90 days", amount: 320000, count: 18, color: "hsl(var(--chart-3))" },
  { range: "90+ days", amount: 140000, count: 8, color: "hsl(var(--destructive))" },
]

const overdueClients = [
  {
    name: "David Thompson",
    unit: "F-201",
    amount: 45000,
    daysOverdue: 15,
    severity: "critical",
    phone: "+1 (555) 123-4567",
    avatar: "/man.jpg",
    lastContact: "2 days ago",
  },
  {
    name: "Maria Garcia",
    unit: "G-305",
    amount: 32000,
    daysOverdue: 8,
    severity: "high",
    phone: "+1 (555) 234-5678",
    avatar: "/woman-2.jpg",
    lastContact: "1 week ago",
  },
  {
    name: "James Miller",
    unit: "H-102",
    amount: 28000,
    daysOverdue: 5,
    severity: "medium",
    phone: "+1 (555) 345-6789",
    avatar: "/man-2.jpg",
    lastContact: "3 days ago",
  },
  {
    name: "Anna Rodriguez",
    unit: "I-404",
    amount: 22000,
    daysOverdue: 3,
    severity: "low",
    phone: "+1 (555) 456-7890",
    avatar: "/woman-3.jpg",
    lastContact: "1 day ago",
  },
]

const recoveryTrends = [
  { month: "Jan", recovered: 180000, outstanding: 890000 },
  { month: "Feb", recovered: 220000, outstanding: 850000 },
  { month: "Mar", recovered: 195000, outstanding: 920000 },
  { month: "Apr", recovered: 240000, outstanding: 890000 },
  { month: "May", recovered: 210000, outstanding: 910000 },
  { month: "Jun", recovered: 260000, outstanding: 890000 },
]

export function OutstandingReports({ dateRange, reportType }: OutstandingReportsProps) {
  const totalOutstanding = agingData.reduce((sum, item) => sum + item.amount, 0)
  const totalCount = agingData.reduce((sum, item) => sum + item.count, 0)
  const criticalCount = overdueClients.filter((client) => client.severity === "critical").length

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Outstanding KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{(totalOutstanding / 1000).toFixed(0)}K ETB</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">{totalCount} accounts</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{criticalCount}</div>
            <div className="flex items-center gap-1 text-xs">
              <Badge variant="destructive" className="text-xs">
                Urgent Action Required
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Days Overdue</CardTitle>
            <Clock className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">12.5</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">-2.1 days improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recovery Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">78.5%</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-green-500">+5.2% improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Aging Analysis */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Outstanding Aging Analysis</CardTitle>
              <CardDescription>Outstanding amounts by age groups</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={agingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {agingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, ""]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recovery Trends */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recovery Trends</CardTitle>
              <CardDescription>Monthly recovery vs outstanding balance</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={recoveryTrends}>
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip
                  formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, ""]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Bar dataKey="recovered" fill="hsl(var(--chart-1))" name="Recovered" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outstanding" fill="hsl(var(--chart-3))" name="Outstanding" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Critical Overdue Accounts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Critical Overdue Accounts
            </CardTitle>
            <CardDescription>Accounts requiring immediate attention</CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overdueClients.map((client) => (
              <div key={client.name} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                    <AvatarFallback>
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{client.name}</h4>
                      <Badge variant={getSeverityColor(client.severity)} className="text-xs">
                        {client.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Unit {client.unit}</span>
                      <span>•</span>
                      <span>{client.daysOverdue} days overdue</span>
                      <span>•</span>
                      <span>Last contact: {client.lastContact}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold">{client.amount.toLocaleString()} ETB</div>
                    <div className="text-xs text-muted-foreground">{client.phone}</div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
