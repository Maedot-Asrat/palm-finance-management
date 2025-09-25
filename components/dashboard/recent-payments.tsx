"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentPayments = [
  {
    id: "1",
    client: "Sarah Johnson",
    unit: "A-101",
    amount: "ETB 15,000",
    date: "2 hours ago",
    status: "completed",
    avatar: "/diverse-woman-portrait.png",
  },
  {
    id: "2",
    client: "Michael Chen",
    unit: "B-205",
    amount: "ETB 22,500",
    date: "5 hours ago",
    status: "completed",
    avatar: "/man.jpg",
  },
  {
    id: "3",
    client: "Emily Davis",
    unit: "C-301",
    amount: "ETB 18,750",
    date: "1 day ago",
    status: "pending",
    avatar: "/woman-2.jpg",
  },
  {
    id: "4",
    client: "Robert Wilson",
    unit: "D-102",
    amount: "ETB 25,000",
    date: "2 days ago",
    status: "completed",
    avatar: "/man-2.jpg",
  },
  {
    id: "5",
    client: "Lisa Anderson",
    unit: "E-404",
    amount: "ETB 20,000",
    date: "3 days ago",
    status: "completed",
    avatar: "/woman-3.jpg",
  },
]

export function RecentPayments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
        <CardDescription>Latest payment transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={payment.avatar || "/placeholder.svg"} alt={payment.client} />
                  <AvatarFallback>
                    {payment.client
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{payment.client}</p>
                  <p className="text-xs text-muted-foreground">Unit {payment.unit}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-card-foreground">{payment.amount}</p>
                <div className="flex items-center gap-2">
                  <Badge variant={payment.status === "completed" ? "default" : "secondary"} className="text-xs">
                    {payment.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{payment.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
