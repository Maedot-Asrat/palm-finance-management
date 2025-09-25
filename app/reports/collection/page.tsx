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
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, Target, TrendingUp, Clock, CheckCircle } from "lucide-react"

const collectionTrends = [
  { month: "Jan", collected: 2200000, target: 2500000, rate: 88 },
  { month: "Feb", collected: 2600000, target: 2800000, rate: 93 },
  { month: "Mar", collected: 2950000, target: 3000000, rate: 98 },
  { month: "Apr", collected: 2750000, target: 2900000, rate: 95 },
  { month: "May", collected: 3200000, target: 3300000, rate: 97 },
  { month: "Jun", collected: 3500000, target: 3600000, rate: 97 },
]

const collectionMethods = [
  { method: "Bank Transfer", amount: 12500000, percentage: 62 },
  { method: "Cash Payment", amount: 4800000, percentage: 24 },
  { method: "Check", amount: 2200000, percentage: 11 },
  { method: "Mobile Payment", amount: 600000, percentage: 3 },
]

const dailyCollections = [
  { day: "Mon", amount: 450000 },
  { day: "Tue", amount: 520000 },
  { day: "Wed", amount: 380000 },
  { day: "Thu", amount: 620000 },
  { day: "Fri", amount: 580000 },
  { day: "Sat", amount: 320000 },
  { day: "Sun", amount: 180000 },
]

export default function CollectionReportsPage() {
  return (
    <AuthGuard allowedRoles={["admin", "finance"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Collection Reports</h1>
            <p className="text-muted-foreground">Track payment collection performance and trends</p>
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
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Collection Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ETB 20.1M</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +15.2% from last period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.8%</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +2.1% from last period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Collection Time</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2</div>
              <div className="text-xs text-muted-foreground">days average</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <Clock className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ETB 1.1M</div>
              <div className="text-xs text-muted-foreground">5.2% of total</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Collection vs Target</CardTitle>
              <CardDescription>Monthly collection performance against targets</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  collected: { label: "Collected", color: "#1d4d71" },
                  target: { label: "Target", color: "#ebc587" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={collectionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="target" fill="#ebc587" name="Target" opacity={0.7} />
                    <Bar dataKey="collected" fill="#1d4d71" name="Collected" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collection Rate Trend</CardTitle>
              <CardDescription>Monthly collection rate percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  rate: { label: "Collection Rate", color: "#16a34a" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={collectionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      stroke="#16a34a"
                      fill="#16a34a"
                      fillOpacity={0.3}
                      name="Collection Rate (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Collection Methods</CardTitle>
              <CardDescription>Payment methods breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: { label: "Amount", color: "#1d4d71" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={collectionMethods} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="method" type="category" width={100} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" fill="#1d4d71" name="Amount (ETB)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Collection Pattern</CardTitle>
              <CardDescription>Average daily collection amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: { label: "Amount", color: "#ebc587" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyCollections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#ebc587"
                      strokeWidth={3}
                      name="Daily Collection (ETB)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
