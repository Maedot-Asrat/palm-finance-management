"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Calendar,
  User,
  Building2,
  Plus,
} from "lucide-react"

const documents = [
  {
    id: 1,
    name: "Purchase Agreement - Unit A-101",
    type: "Contract",
    client: "John Smith",
    unit: "A-101",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    status: "Active",
    uploadedBy: "Sarah Johnson",
    avatar: "/diverse-woman-portrait.png",
  },
  {
    id: 2,
    name: "Payment Receipt - January 2024",
    type: "Receipt",
    client: "Maria Garcia",
    unit: "B-205",
    uploadDate: "2024-01-10",
    size: "1.2 MB",
    status: "Archived",
    uploadedBy: "Michael Chen",
    avatar: "/man.jpg",
  },
  {
    id: 3,
    name: "Property Deed - Unit C-301",
    type: "Legal Document",
    client: "David Thompson",
    unit: "C-301",
    uploadDate: "2024-01-08",
    size: "3.1 MB",
    status: "Active",
    uploadedBy: "Emily Davis",
    avatar: "/woman-2.jpg",
  },
  {
    id: 4,
    name: "Insurance Policy - Building F",
    type: "Insurance",
    client: "Palm Real Estate",
    unit: "All Units",
    uploadDate: "2024-01-05",
    size: "4.8 MB",
    status: "Active",
    uploadedBy: "Robert Wilson",
    avatar: "/man-2.jpg",
  },
  {
    id: 5,
    name: "Maintenance Report - December 2023",
    type: "Report",
    client: "Operations Team",
    unit: "Multiple",
    uploadDate: "2023-12-28",
    size: "1.8 MB",
    status: "Archived",
    uploadedBy: "Anna Rodriguez",
    avatar: "/woman-3.jpg",
  },
]

const documentTypes = ["All Types", "Contract", "Receipt", "Legal Document", "Insurance", "Report"]
const statusOptions = ["All Status", "Active", "Archived", "Pending"]

export function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.unit.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All Types" || doc.type === selectedType
    const matchesStatus = selectedStatus === "All Status" || doc.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Archived":
        return "secondary"
      case "Pending":
        return "outline"
      default:
        return "outline"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Contract":
        return <FileText className="h-4 w-4 text-chart-1" />
      case "Receipt":
        return <FileText className="h-4 w-4 text-chart-2" />
      case "Legal Document":
        return <FileText className="h-4 w-4 text-chart-3" />
      case "Insurance":
        return <FileText className="h-4 w-4 text-chart-4" />
      case "Report":
        return <FileText className="h-4 w-4 text-chart-5" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Document Management</h2>
          <p className="text-muted-foreground">Manage contracts, receipts, and legal documents</p>
        </div>

        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Upload a new document to the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="document-name">Document Name</Label>
                <Input id="document-name" placeholder="Enter document name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="document-type">Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="receipt">Receipt</SelectItem>
                    <SelectItem value="legal">Legal Document</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client-unit">Client/Unit</Label>
                <Input id="client-unit" placeholder="Enter client name or unit number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter document description" />
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Choose Files
                </Button>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsUploadOpen(false)} className="flex-1">
                  Upload Document
                </Button>
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documents, clients, or units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(document.type)}
                  <Badge variant="outline" className="text-xs">
                    {document.type}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-base line-clamp-2">{document.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <Badge variant={getStatusColor(document.status)}>{document.status}</Badge>
                <span className="text-muted-foreground">{document.size}</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Client:</span>
                  <span className="font-medium">{document.client}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Building2 className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Unit:</span>
                  <span className="font-medium">{document.unit}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Uploaded:</span>
                  <span className="font-medium">{document.uploadDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={document.avatar || "/placeholder.svg"} alt={document.uploadedBy} />
                  <AvatarFallback className="text-xs">
                    {document.uploadedBy
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Uploaded by {document.uploadedBy}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No documents found</h3>
            <p className="text-muted-foreground text-center">
              No documents match your current filters. Try adjusting your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
