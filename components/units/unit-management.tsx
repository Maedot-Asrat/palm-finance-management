"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Eye, Edit, MapPin, DollarSign, Calendar, User } from "lucide-react"

const units = [
  {
    id: "1",
    unitNumber: "A-101",
    floor: "1st Floor",
    type: "2 Bedroom",
    area: "1,200 sq ft",
    price: 500000,
    status: "sold",
    client: "Sarah Johnson",
    clientAvatar: "/diverse-woman-portrait.png",
    saleDate: "2023-06-15",
    paidAmount: 350000,
    nextDue: "2024-01-15",
  },
  {
    id: "2",
    unitNumber: "A-102",
    floor: "1st Floor",
    type: "2 Bedroom",
    area: "1,200 sq ft",
    price: 500000,
    status: "available",
    client: null,
    clientAvatar: null,
    saleDate: null,
    paidAmount: 0,
    nextDue: null,
  },
  {
    id: "3",
    unitNumber: "B-205",
    floor: "2nd Floor",
    type: "3 Bedroom",
    area: "1,500 sq ft",
    price: 750000,
    status: "sold",
    client: "Michael Chen",
    clientAvatar: "/man.jpg",
    saleDate: "2023-08-22",
    paidAmount: 450000,
    nextDue: "2024-01-10",
  },
  {
    id: "4",
    unitNumber: "C-301",
    floor: "3rd Floor",
    type: "3 Bedroom",
    area: "1,600 sq ft",
    price: 650000,
    status: "reserved",
    client: "Emily Davis",
    clientAvatar: "/woman-2.jpg",
    saleDate: "2023-09-10",
    paidAmount: 65000,
    nextDue: "2024-01-20",
  },
  {
    id: "5",
    unitNumber: "D-102",
    floor: "1st Floor",
    type: "1 Bedroom",
    area: "800 sq ft",
    price: 350000,
    status: "sold",
    client: "Robert Wilson",
    clientAvatar: "/man-2.jpg",
    saleDate: "2023-07-05",
    paidAmount: 280000,
    nextDue: "2024-01-12",
  },
  {
    id: "6",
    unitNumber: "E-404",
    floor: "4th Floor",
    type: "Penthouse",
    area: "2,000 sq ft",
    price: 1200000,
    status: "available",
    client: null,
    clientAvatar: null,
    saleDate: null,
    paidAmount: 0,
    nextDue: null,
  },
]

export function UnitManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredUnits = units.filter((unit) => {
    const matchesSearch =
      unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (unit.client && unit.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
      unit.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || unit.status === statusFilter
    const matchesType = typeFilter === "all" || unit.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "outline"
      case "reserved":
        return "secondary"
      case "sold":
        return "default"
      case "completed":
        return "default"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available"
      case "reserved":
        return "Reserved"
      case "sold":
        return "Sold"
      case "completed":
        return "Completed"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search units..."
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
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
              <SelectItem value="2 Bedroom">2 Bedroom</SelectItem>
              <SelectItem value="3 Bedroom">3 Bedroom</SelectItem>
              <SelectItem value="Penthouse">Penthouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Unit Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUnits.map((unit) => {
          const progressPercentage = unit.price > 0 ? (unit.paidAmount / unit.price) * 100 : 0

          return (
            <Card key={unit.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{unit.unitNumber}</CardTitle>
                    <CardDescription>
                      {unit.floor} • {unit.type}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(unit.status)} className="text-xs">
                    {getStatusText(unit.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Unit Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{unit.area}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{unit.price.toLocaleString()}ETB</span>
                  </div>
                </div>

                {/* Client Info */}
                {unit.client && (
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={unit.clientAvatar || "/placeholder.svg"} alt={unit.client} />
                      <AvatarFallback>
                        {unit.client
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{unit.client}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Sold: {unit.saleDate}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Progress (for sold units) */}
                {unit.status === "sold" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Progress</span>
                      <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{unit.paidAmount.toLocaleString()} ETB</span>
                      <span>Next: {unit.nextDue}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  {unit.client && (
                    <Button size="sm" variant="outline">
                      <User className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
