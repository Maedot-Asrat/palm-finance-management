"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Phone } from "lucide-react"

const overduePayments = [
  {
    id: "1",
    client: "David Thompson",
    unit: "F-201",
    amount: "ETB 12,500", // Updated currency from $ to ETB
    daysOverdue: 15,
    severity: "critical",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    client: "Maria Garcia",
    unit: "G-305",
    amount: "ETB 18,000", // Updated currency from $ to ETB
    daysOverdue: 8,
    severity: "high",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "3",
    client: "James Miller",
    unit: "H-102",
    amount: "ETB 22,000", // Updated currency from $ to ETB
    daysOverdue: 5,
    severity: "medium",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "4",
    client: "Anna Rodriguez",
    unit: "I-404",
    amount: "ETB 16,750", // Updated currency from $ to ETB
    daysOverdue: 3,
    severity: "low",
    phone: "+1 (555) 456-7890",
  },
]

export function OverdueAlerts() {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Overdue Payments
        </CardTitle>
        <CardDescription>Payments requiring immediate attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {overduePayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-card-foreground">{payment.client}</p>
                  <Badge variant={getSeverityColor(payment.severity)} className="text-xs">
                    {payment.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  Unit {payment.unit} • {payment.amount}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {payment.daysOverdue} days overdue
                </div>
              </div>
              <Button size="sm" variant="outline" className="ml-3 bg-transparent">
                <Phone className="h-3 w-3 mr-1" />
                Call
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
