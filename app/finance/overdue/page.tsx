"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Phone, Mail, AlertTriangle, Clock } from "lucide-react"

const overdueData = [
  {
    id: "OVD-001",
    clientName: "Mohammed Yusuf",
    unitNumber: "C-302",
    phone: "+251-911-123456",
    email: "mohammed.yusuf@email.com",
    amount: 15000,
    dueDate: "2024-01-10",
    daysPastDue: 15,
    installmentNumber: 8,
    totalAmount: 360000,
    lastContact: "2024-01-20",
  },
  {
    id: "OVD-002",
    clientName: "Sara Ahmed",
    unitNumber: "B-105",
    phone: "+251-911-789012",
    email: "sara.ahmed@email.com",
    amount: 28000,
    dueDate: "2024-01-05",
    daysPastDue: 20,
    installmentNumber: 4,
    totalAmount: 504000,
    lastContact: "2024-01-18",
  },
  {
    id: "OVD-003",
    clientName: "Dawit Tesfaye",
    unitNumber: "A-301",
    phone: "+251-911-345678",
    email: "dawit.tesfaye@email.com",
    amount: 32000,
    dueDate: "2024-01-12",
    daysPastDue: 13,
    installmentNumber: 6,
    totalAmount: 576000,
    lastContact: "2024-01-22",
  },
]

export default function OverduePage() {
  const getPriorityBadge = (days: number) => {
    if (days >= 30) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
    } else if (days >= 15) {
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
    }
  }

  return (
    <AuthGuard allowedRoles={["admin", "finance"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Overdue Payments</h1>
            <p className="text-muted-foreground">Manage and follow up on overdue installments</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Phone className="mr-2 h-4 w-4" />
            Bulk Contact
          </Button>
        </div>

        {/* Alert Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Overdue</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">23</div>
              <p className="text-xs text-muted-foreground">Accounts past due</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Amount Overdue</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">ETB 1.2M</div>
              <p className="text-xs text-muted-foreground">Total outstanding</p>
            </CardContent>
          </Card>
          <Card className="border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Days Overdue</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">18</div>
              <p className="text-xs text-muted-foreground">Days average</p>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recovery Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">78%</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Overdue Management */}
        <Card>
          <CardHeader>
            <CardTitle>Overdue Accounts</CardTitle>
            <CardDescription>Track and manage overdue payments with follow-up actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search overdue accounts..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Priority
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>

            {/* Overdue Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Client Details</TableHead>
                    <TableHead>Amount Due</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overdueData.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{account.id}</div>
                          <div className="text-sm text-muted-foreground">Unit {account.unitNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{account.clientName}</div>
                          <div className="text-sm text-muted-foreground">{account.phone}</div>
                          <div className="text-sm text-muted-foreground">{account.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-red-600">ETB {account.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Due: {account.dueDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600">{account.daysPastDue}</div>
                          <div className="text-xs text-muted-foreground">days</div>
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(account.daysPastDue)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{account.lastContact}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-3 w-3 mr-1" />
                            Email
                          </Button>
                          <Button size="sm">Record Payment</Button>
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
