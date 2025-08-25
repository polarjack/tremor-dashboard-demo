"use client"

import React from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface HistoryData {
  date: string
  sol_price: number
  msol_price: number
  btc_price: number
  msol_holdings: number
  daily_msol_sold: number
  daily_usd_sold: number
  daily_zbtc_bought: number
  cum_zbtc: number
}

export default function History() {
  const [data, setData] = React.useState<HistoryData[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/history-price.csv')
        const csvText = await response.text()

        const lines = csvText.trim().split('\n')
        const headers = lines[0].split(',')

        const parsedData = lines.slice(1).map(line => {
          const values = line.split(',')
          const item: any = {}

          headers.forEach((header, index) => {
            const value = values[index]
            if (header === 'date') {
              item[header] = value
            } else {
              item[header] = parseFloat(value)
            }
          })

          return item as HistoryData
        })

        setData(parsedData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const chartData = React.useMemo(() => {
    return data.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-CA').replace(/-/g, '/'),
      'SOL Price (USD)': item.sol_price,
      'Cumulative zBTC': item.cum_zbtc,
    }))
  }, [data])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading data...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Price History
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Historical price data from 2024-01-01 to 2025-08-05
        </p>
      </div>

      <div className="bg-gray-950 rounded-lg border border-gray-800 p-4">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-gray-50">
              SOL Price vs zBTC Accumulation Trend
            </h2>
            <p className="text-sm text-gray-400">
              Daily zBTC accumulation at a 0.6% SOL annual sell rate
            </p>
          </div>

          <div className="h-[32rem]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="1 1"
                  stroke="#374151"
                  opacity={1}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  tickLine={false}
                  axisLine={false}
                  domain={[(dataMin: number) => Math.floor(dataMin / 10) * 10, (dataMax: number) => Math.ceil(dataMax / 10) * 10]}
                  tickCount={10}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  tickLine={false}
                  axisLine={false}
                  tickCount={10}
                  domain={[(dataMin: number) => Math.floor(dataMin / 0.01) * 0.01, (dataMax: number) => Math.ceil(dataMax / 0.01) * 0.01]}
                  tickFormatter={(value) => Number(value).toFixed(2)}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
                          <div className="text-gray-300 text-sm font-medium mb-2">
                            {label}
                          </div>
                          {payload.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2 mb-1">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-gray-300 text-sm">
                                {entry.name}
                              </span>
                              <span className="text-white text-sm font-medium ml-auto">
                                {typeof entry.value === 'number'
                                  ? entry.name === 'SOL Price (USD)'
                                    ? entry.value.toFixed(2)
                                    : entry.value.toFixed(3)
                                  : entry.value
                                }
                              </span>
                            </div>
                          ))}
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{
                    paddingTop: '20px',
                    color: '#D1D5DB'
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="SOL Price (USD)"
                  stroke="#9C5CE9"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, fill: "#9C5CE9", stroke: "#9C5CE9", strokeWidth: 2 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="Cumulative zBTC"
                  stroke="#FFE46B"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, fill: "#FFE46B", stroke: "#FFE46B", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}