"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, AlertTriangle, Clock, TrendingUp, Users } from "lucide-react"

const outstandingByAge = [
  { range: "0-30 days", amount: 450000, count: 12, color: "#16a34a" },
  { range: "31-60 days", amount: 320000, count: 8, color: "#eab308" },
  { range: "61-90 days", amount: 180000, count: 5, color: "#f97316" },
  { range: "90+ days", amount: 150000, count: 3, color: "#ef4444" },
]

const outstandingTrend = [
  { month: "Jan", amount: 980000, accounts: 25 },
  { month: "Feb", amount: 1200000, accounts: 28 },
  { month: "Mar", amount: 1100000, accounts: 26 },
  { month: "Apr", amount: 1350000, accounts: 32 },
  { month: "May", amount: 1180000, accounts: 29 },
  { month: "Jun", amount: 1100000, accounts: 28 },
]

const topOutstandingAccounts = [
  {
    id: "ACC-001",
    clientName: "Mohammed Yusuf",
    unitNumber: "C-302",
    amount: 150000,
    daysOutstanding: 45,
    lastPayment: "2023-12-10",
    status: "high-risk",
  },
  {
    id: "ACC-002",
    clientName: "Sara Ahmed",
    unitNumber: "B-105",
    amount: 120000,
    daysOutstanding: 32,
    lastPayment: "2023-12-25",
    status: "medium-risk",
  },
  {
    id: "ACC-003",
    clientName: "Dawit Tesfaye",
    unitNumber: "A-301",
    amount: 95000,
    daysOutstanding: 28,
    lastPayment: "2024-01-02",
    status: "low-risk",
  },
  {
    id: "ACC-004",
    clientName: "Hanan Ali",
    unitNumber: "D-201",
    amount: 85000,
    daysOutstanding: 22,
    lastPayment: "2024-01-08",
    status: "low-risk",
  },
  {
    id: "ACC-005",
    clientName: "Yonas Bekele",
    unitNumber: "B-303",
    amount: 75000,
    daysOutstanding: 18,
    lastPayment: "2024-01-15",
    status: "low-risk",
  },
]

export default function OutstandingReportsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "high-risk":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Risk</Badge>
      case "medium-risk":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium Risk</Badge>
      case "low-risk":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Risk</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <AuthGuard allowedRoles={["admin", "finance"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Outstanding Reports</h1>
            <p className="text-muted-foreground">Monitor and analyze outstanding payment accounts</p>
          </div>
          <div className="flex items-center gap-3">
            <DatePickerWithRange />
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                <SelectItem value="high-risk">High Risk</SelectItem>
                <SelectItem value="medium-risk">Medium Risk</SelectItem>
                <SelectItem value="low-risk">Low Risk</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Outstanding Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ETB 1.1M</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                -8.2% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Accounts</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <div className="text-xs text-muted-foreground">Active accounts</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Outstanding</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ETB 39.3K</div>
              <div className="text-xs text-muted-foreground">Per account</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Accounts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <div className="text-xs text-muted-foreground">Require attention</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding by Age</CardTitle>
              <CardDescription>Distribution of outstanding amounts by age</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: { label: "Amount", color: "#1d4d71" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={outstandingByAge}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="amount"
                      label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {outstandingByAge.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Outstanding Trend</CardTitle>
              <CardDescription>Monthly outstanding amounts and account count</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: { label: "Amount", color: "#1d4d71" },
                  accounts: { label: "Accounts", color: "#ebc587" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={outstandingTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="amount" fill="#1d4d71" name="Outstanding Amount (ETB)" />
                    <Bar dataKey="accounts" fill="#ebc587" name="Account Count" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Outstanding Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Top Outstanding Accounts</CardTitle>
            <CardDescription>Accounts with highest outstanding amounts requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account ID</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Outstanding Amount</TableHead>
                    <TableHead>Days Outstanding</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topOutstandingAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">{account.id}</TableCell>
                      <TableCell>{account.clientName}</TableCell>
                      <TableCell>{account.unitNumber}</TableCell>
                      <TableCell className="font-medium">ETB {account.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">{account.daysOutstanding}</div>
                          <div className="text-xs text-muted-foreground">days</div>
                        </div>
                      </TableCell>
                      <TableCell>{account.lastPayment}</TableCell>
                      <TableCell>{getStatusBadge(account.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Contact
                          </Button>
                          <Button size="sm">View Details</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}
