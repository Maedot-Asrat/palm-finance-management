"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Download, Eye } from "lucide-react"

const payments = [
  {
    id: "PAY-001",
    date: "2024-01-08",
    client: "Sarah Johnson",
    unit: "A-101",
    amount: 15000,
    mode: "Bank Transfer",
    reference: "TXN123456789",
    status: "completed",
    avatar: "/diverse-woman-portrait.png",
  },
  {
    id: "PAY-002",
    date: "2024-01-07",
    client: "Michael Chen",
    unit: "B-205",
    amount: 22500,
    mode: "Check",
    reference: "CHK-789456",
    status: "completed",
    avatar: "/man.jpg",
  },
  {
    id: "PAY-003",
    date: "2024-01-06",
    client: "Emily Davis",
    unit: "C-301",
    amount: 18750,
    mode: "Online Payment",
    reference: "ONL-456123",
    status: "pending",
    avatar: "/woman-2.jpg",
  },
  {
    id: "PAY-004",
    date: "2024-01-05",
    client: "Robert Wilson",
    unit: "D-102",
    amount: 25000,
    mode: "Bank Transfer",
    reference: "TXN987654321",
    status: "completed",
    avatar: "/man-2.jpg",
  },
  {
    id: "PAY-005",
    date: "2024-01-04",
    client: "Lisa Anderson",
    unit: "E-404",
    amount: 20000,
    mode: "Cash",
    reference: "CASH-001",
    status: "completed",
    avatar: "/woman-3.jpg",
  },
]

export function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [modeFilter, setModeFilter] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesMode = modeFilter === "all" || payment.mode === modeFilter

    return matchesSearch && matchesStatus && matchesMode
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>Complete record of all payment transactions</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Payment Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Check">Check</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Online Payment">Online Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Payment List */}
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={payment.avatar || "/placeholder.svg"} alt={payment.client} />
                  <AvatarFallback>
                    {payment.client
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-card-foreground">{payment.client}</h4>
                    <Badge
                      variant={
                        payment.status === "completed"
                          ? "default"
                          : payment.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Unit {payment.unit}</span>
                    <span>•</span>
                    <span>{payment.mode}</span>
                    <span>•</span>
                    <span>{payment.reference}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-card-foreground">{payment.amount.toLocaleString()}ETB</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{payment.date}</span>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
