import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
        }}
      >
        <defs>
          <linearGradient id="colorTodo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="5%" stopColor="#fb923c" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="colorInProgress" x1="0" y1="0" x2="1" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="colorCompleted" x1="0" y1="0" x2="1" y2="1">
            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis
          dataKey="name"
          type="category"
          scale="band"
          width={150}
          tick={{ fill: '#666', fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="todo"
          stackId="a"
          name="To Do"
          barSize={20}
          fill="url(#colorTodo)"
        />
        <Bar
          dataKey="inProgress"
          stackId="a"
          name="In Progress"
          barSize={20}
          fill="url(#colorInProgress)"
        />
        <Bar
          dataKey="completed"
          stackId="a"
          name="Completed"
          barSize={20}
          fill="url(#colorCompleted)"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartHorizon
