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
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
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
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 20,
          right: 70,
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
          <linearGradient id="colorReview" x1="0" y1="0" x2="1" y2="1">
            <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#eab308" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="colorApproved" x1="0" y1="0" x2="1" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#059669" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="colorRejected" x1="0" y1="0" x2="1" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#dc2626" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="colorPending" x1="0" y1="0" x2="1" y2="1">
            <stop offset="10%" stopColor="#fbbf24" stopOpacity={0.8} />
            <stop offset="90%" stopColor="#f59e0b" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis
          dataKey="name"
          type="category"
          width={150}
          tick={{ fill: '#666', fontSize: 9 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="Todo"
          stackId="a"
          name="To Do"
          barSize={10}
          fill="url(#colorTodo)"
        />
        <Bar
          dataKey="Implement"
          stackId="a"
          name="Implement"
          barSize={10}
          fill="url(#colorInProgress)"
        />
        <Bar
          dataKey="Testing"
          stackId="a"
          name="Testing"
          barSize={10}
          fill="url(#colorCompleted)"
        />
        <Bar
          dataKey="Production"
          stackId="a"
          name="Production"
          barSize={10}
          fill="url(#colorReview)"
        />
        {/* <Bar
                    dataKey="approved"
                    stackId="a"
                    name="Approved"
                    barSize={6}
                    fill="url(#colorApproved)"
                />
                <Bar
                    dataKey="rejected"
                    stackId="a"
                    name="Rejected"
                    barSize={6}
                    fill="url(#colorRejected)"
                />
                <Bar
                    dataKey="pending"
                    stackId="a"
                    name="Pending"
                    barSize={6}
                    fill="url(#colorPending)"
                /> */}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartHorizon
