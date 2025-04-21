"use client"

import { useState, useEffect, useRef } from "react"

export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const { triggerOnce = false } = options

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If triggerOnce is false, we update isInView every time the element enters or leaves the viewport
        if (!triggerOnce || !isInView) {
          setIsInView(entry.isIntersecting)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "0px",
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options.threshold, options.rootMargin, triggerOnce, isInView])

  return [ref, isInView]
}
