"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { month: "Jan", collected: 2100000, target: 2000000 },
  { month: "Feb", collected: 1950000, target: 2000000 },
  { month: "Mar", collected: 2250000, target: 2200000 },
  { month: "Apr", collected: 2400000, target: 2300000 },
  { month: "May", collected: 2150000, target: 2200000 },
  { month: "Jun", collected: 2600000, target: 2500000 },
]

export function CollectionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Collections</CardTitle>
        <CardDescription>Collection performance vs targets</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `ETB ${(value / 1000000).toFixed(1)}M`} />
            <Tooltip
              formatter={(value: number) => [`ETB ${(value / 1000000).toFixed(2)}M`, ""]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Bar dataKey="collected" fill="#1d4d71" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" fill="#ebc587" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
