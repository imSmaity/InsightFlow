import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import barChart from './helper/barChart'
import lineChart from './helper/lineChart'
import useFetch from './hooks/useFetch'
import Api from './api'

function ZoomableLineChart() {
  const { data, loading, error } = useFetch(Api.getVisualizationData)
  const canvasRef = useRef(null)
  const lineRef = useRef(null)
  console.log(data)

  useEffect(() => {
    if (!loading && data) {
      let barData = {
        F: 60,
        E: 30,
        D: 44,
        C: 64,
        B: 17,
        A: 19,
      }
      let lineData = data.info.map((d) => {
        return { day: new Date(d.day).toDateString(), A: d.a }
      })
      console.log(lineData)
      let svg = d3.select(canvasRef.current).append('svg')
      let svg2 = d3.select(lineRef.current).append('svg')
      barChart(barData, svg)
      lineChart(lineData, svg2)
    }
  }, [loading])

  // Handle new book add
  const handleClick = () => {}

  return (
    <div>
      <div ref={canvasRef}></div>
      <div ref={lineRef}></div>
    </div>
  )
}

export default ZoomableLineChart
