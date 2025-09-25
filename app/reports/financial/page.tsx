"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"

const monthlyRevenue = [
  { month: "Jan", revenue: 2400000, expenses: 800000, profit: 1600000 },
  { month: "Feb", revenue: 2800000, expenses: 900000, profit: 1900000 },
  { month: "Mar", revenue: 3200000, expenses: 1000000, profit: 2200000 },
  { month: "Apr", revenue: 2900000, expenses: 950000, profit: 1950000 },
  { month: "May", revenue: 3500000, expenses: 1100000, profit: 2400000 },
  { month: "Jun", revenue: 3800000, expenses: 1200000, profit: 2600000 },
]

const revenueBySource = [
  { name: "Installment Payments", value: 15600000, color: "#1d4d71" },
  { name: "Down Payments", value: 8400000, color: "#ebc587" },
  { name: "Late Fees", value: 1200000, color: "#2563eb" },
  { name: "Other Income", value: 800000, color: "#16a34a" },
]

const quarterlyComparison = [
  { quarter: "Q1 2023", revenue: 8400000, profit: 5700000 },
  { quarter: "Q2 2023", revenue: 9200000, profit: 6300000 },
  { quarter: "Q3 2023", revenue: 10100000, profit: 6900000 },
  { quarter: "Q4 2023", revenue: 11800000, profit: 8100000 },
  { quarter: "Q1 2024", revenue: 12600000, profit: 8700000 },
]

export default function FinancialReportsPage() {
  return (
    <AuthGuard allowedRoles={["admin", "finance"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
            <p className="text-muted-foreground">Comprehensive financial analysis and reporting</p>
          </div>
          <div className="flex items-center gap-3">
            <DatePickerWithRange />
            <Select defaultValue="monthly">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ETB 26.0M</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +12.5% from last period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ETB 17.1M</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +8.2% from last period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Operating Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ETB 8.9M</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +3.1% from last period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65.8%</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +2.3% from last period
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue & Profit</CardTitle>
              <CardDescription>Revenue, expenses, and profit trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: { label: "Revenue", color: "#1d4d71" },
                  expenses: { label: "Expenses", color: "#ef4444" },
                  profit: { label: "Profit", color: "#ebc587" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#1d4d71" name="Revenue" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    <Bar dataKey="profit" fill="#ebc587" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Source</CardTitle>
              <CardDescription>Breakdown of revenue streams</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  installments: { label: "Installments", color: "#1d4d71" },
                  downPayments: { label: "Down Payments", color: "#ebc587" },
                  lateFees: { label: "Late Fees", color: "#2563eb" },
                  other: { label: "Other", color: "#16a34a" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueBySource}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {revenueBySource.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quarterly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Performance Comparison</CardTitle>
            <CardDescription>Year-over-year quarterly revenue and profit comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: "#1d4d71" },
                profit: { label: "Profit", color: "#ebc587" },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quarterlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#1d4d71" strokeWidth={3} name="Revenue" />
                  <Line type="monotone" dataKey="profit" stroke="#ebc587" strokeWidth={3} name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}
