import React from 'react'
import {
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Cell,
} from 'recharts'
import { chartData } from '../../../assets/data'

const Chart = () => {
  const data = chartData
  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.total))
    const dataMin = Math.min(...data.map((i) => i.total))

    if (dataMax <= 0) {
      return 0
    } else if (dataMin >= 0) {
      return 1
    } else {
      return dataMax / (dataMax - dataMin)
    }
  }

  const off = gradientOffset()

  return (
    <>
      <ResponsiveContainer width={'100%'} height={500}>
        <BarChart width={150} height={40} data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0000FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ADD8E6" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: '#8884d8', color: '#fff' }}
          />
          <Legend />
          <CartesianGrid strokeDasharray="5 4" />
          <Bar dataKey="total" fill="url(#colorUv)">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default Chart
