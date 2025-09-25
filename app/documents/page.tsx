"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { DocumentManagement } from "@/components/documents/document-management"

export default function DocumentsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole="admin" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Document Management" />
        <main className="flex-1 overflow-y-auto p-6">
          <DocumentManagement />
        </main>
      </div>
    </div>
  )
}
