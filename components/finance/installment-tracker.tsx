"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign, Phone } from "lucide-react"

const installments = [
  {
    id: "1",
    client: "Sarah Johnson",
    unit: "A-101",
    totalAmount: 500000,
    paidAmount: 350000,
    nextDue: "2024-01-15",
    nextAmount: 25000,
    status: "current",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    client: "Michael Chen",
    unit: "B-205",
    totalAmount: 750000,
    paidAmount: 450000,
    nextDue: "2024-01-10",
    nextAmount: 37500,
    status: "due-soon",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "3",
    client: "David Thompson",
    unit: "F-201",
    totalAmount: 600000,
    paidAmount: 300000,
    nextDue: "2023-12-28",
    nextAmount: 30000,
    status: "overdue",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "4",
    client: "Emily Davis",
    unit: "C-301",
    totalAmount: 650000,
    paidAmount: 520000,
    nextDue: "2024-01-20",
    nextAmount: 32500,
    status: "current",
    phone: "+1 (555) 456-7890",
  },
]

export function InstallmentTracker() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "destructive"
      case "due-soon":
        return "secondary"
      case "current":
        return "default"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "overdue":
        return "Overdue"
      case "due-soon":
        return "Due Soon"
      case "current":
        return "Current"
      default:
        return "Unknown"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Installment Tracker</CardTitle>
        <CardDescription>Monitor payment schedules and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {installments.map((installment) => {
            const progressPercentage = (installment.paidAmount / installment.totalAmount) * 100

            return (
              <div key={installment.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-card-foreground">{installment.client}</h4>
                    <p className="text-sm text-muted-foreground">Unit {installment.unit}</p>
                  </div>
                  <Badge variant={getStatusColor(installment.status)} className="text-xs">
                    {getStatusText(installment.status)}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Payment Progress</span>
                      <span className="font-medium">
                        ETB {installment.paidAmount.toLocaleString()} / ETB {installment.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Next Due:</span>
                        <span className="font-medium">{installment.nextDue}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">ETB {installment.nextAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
