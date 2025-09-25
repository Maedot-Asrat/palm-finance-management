"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Sold & Paid", value: 145, color: "#1d4d71" }, // Using brand primary color
  { name: "Under Installment", value: 78, color: "#ebc587" }, // Using brand secondary color
  { name: "Reserved", value: 15, color: "#4a90a4" }, // Using complementary blue
  { name: "Available", value: 10, color: "#87ceeb" }, // Using light blue accent
]

export function UnitStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Unit Status Distribution</CardTitle>
        <CardDescription>Current status of all units</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, "Units"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
