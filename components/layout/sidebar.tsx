"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Building2, Calculator, ChevronLeft, ChevronRight, FileText, Home, Menu, PieChart, Users } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: ["admin", "finance", "operations"],
  },
  {
    name: "Finance",
    href: "/finance",
    icon: Calculator,
    roles: ["admin", "finance"],
    children: [
      { name: "Installments", href: "/finance/installments" },
      { name: "Payments", href: "/finance/payments" },
      { name: "Overdue", href: "/finance/overdue" },
    ],
  },
  {
    name: "Clients",
    href: "/clients",
    icon: Users,
    roles: ["admin", "operations"],
  },
  {
    name: "Units",
    href: "/units",
    icon: Building2,
    roles: ["admin", "operations"],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: PieChart,
    roles: ["admin", "finance"],
    children: [
      { name: "Financial Reports", href: "/reports/financial" },
      { name: "Collection Reports", href: "/reports/collection" },
      { name: "Outstanding", href: "/reports/outstanding" },
    ],
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
    roles: ["admin", "operations"],
  },
]

interface SidebarProps {
  userRole?: string
}

export function Sidebar({ userRole = "admin" }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const filteredNavigation = navigation.filter((item) => item.roles.includes(userRole))

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Logo Section */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-8 items-center justify-center rounded bg-white">
            <img src="/palm.png" alt="Palm Real Estate Logo" className="h-10 w-auto" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">Palm Real Estate</span>
              <span className="text-xs text-sidebar-foreground/70">Finance Management</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

            return (
              <div key={item.name}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                      collapsed && "px-2",
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.name}</span>}
                  </Button>
                </Link>

                {!collapsed && item.children && isActive && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link key={child.name} href={child.href}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            pathname === child.href && "bg-sidebar-accent text-sidebar-accent-foreground",
                          )}
                        >
                          {child.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Collapse Toggle */}
      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden border-r border-sidebar-border bg-sidebar transition-all duration-300 lg:block",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
