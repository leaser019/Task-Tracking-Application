import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const BarChartHorizon = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, entry) => sum + entry.value, 0)
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry) => (
            <p
              key={entry.dataKey}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value}
            </p>
          ))}
          <p className="mt-2 pt-2 border-t font-medium">
            Total Applications: {total}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 100
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis
          dataKey="name"
          type="category"
          scale="band"
          width={80}
          tick={{ fill: '#666' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="todo"
          stackId="a"
          name="To Do"
          barSize={20}
          fill="#fb923c"
        />
        <Bar
          dataKey="inProgress"
          stackId="a"
          name="In Progress"
          barSize={20}
          fill="#3b82f6"
        />
        <Bar
          dataKey="completed"
          stackId="a"
          name="Completed"
          barSize={20}
          fill="#4ade80"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartHorizon



