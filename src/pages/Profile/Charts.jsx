import { useEffect, useRef } from "react"

export const BarChart = ({ data }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height
    const barWidth = width / data.labels.length - 20

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Colors for bars
    const colors = [
      "#818cf8", // Indigo
      "#4ade80", // Green
      "#3b82f6", // Blue
      "#a78bfa", // Purple
      "#60a5fa", // Light Blue
      "#000000", // Black
    ]

    // Draw bars
    data.labels.forEach((label, index) => {
      const x = index * (barWidth + 20) + 10
      const barHeight = (data.data[index] / 100) * (height - 40)
      const y = height - barHeight - 20

      ctx.fillStyle = colors[index % colors.length]
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw label
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(label, x + barWidth / 2, height - 5)
    })
  }, [data])

  return <canvas ref={canvasRef} width={400} height={200} />
}

export const PieChart = ({ data }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height
    const radius = Math.min(width, height) / 2 - 10
    const centerX = width / 2
    const centerY = height / 2

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Colors for pie slices
    const colors = [
      "#3b82f6", // Blue
      "#4ade80", // Green
      "#f59e0b", // Yellow
      "#6b7280", // Gray
    ]

    let startAngle = 0
    const total = data.data.reduce((sum, value) => sum + value, 0)

    // Draw pie slices
    data.data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = colors[index % colors.length]
      ctx.fill()

      startAngle += sliceAngle
    })

    // Draw white circle in the middle for donut effect
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()
  }, [data])

  return <canvas ref={canvasRef} width={200} height={200} />
}
