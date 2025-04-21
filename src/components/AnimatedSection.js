"use client"

import { useEffect, useState } from "react"
import { useInView } from "../hooks/useInView"

export function AnimatedSection({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: false })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Update animation state based on visibility
    setHasAnimated(isInView)
  }, [isInView])

  const getDirectionClass = () => {
    switch (direction) {
      case "up":
        return "transform translate-y-8"
      case "down":
        return "transform -translate-y-8"
      case "left":
        return "transform translate-x-8"
      case "right":
        return "transform -translate-x-8"
      default:
        return "transform translate-y-8"
    }
  }

  const getDelayClass = () => {
    const delayMs = delay * 1000
    if (delayMs <= 100) return "delay-100"
    if (delayMs <= 200) return "delay-200"
    if (delayMs <= 300) return "delay-300"
    return "delay-400"
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${getDelayClass()} ${
        hasAnimated ? "opacity-100 transform-none" : `opacity-0 ${getDirectionClass()}`
      } ${className}`}
    >
      {children}
    </div>
  )
}
