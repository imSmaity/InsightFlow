import { Box, Button, InputLabel, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Api from './api'
import barChart from './helper/barChart'
import lineChart from './helper/lineChart'

function ZoomableLineChart({ token }) {
  const navigation = useNavigate()
  const initialFilters = {
    product: '',
    startDate: '',
    endDate: '',
    ageRange: '',
    gender: '',
    zoomStart: '',
    zoomEnd: '',
  }
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const canvasRef = useRef(null)
  const lineRef = useRef(null)
  const [filters, setFilters] = useState(initialFilters)
  const { chartFilters } = useParams()

  // const callBackZoom=useCallback(_.debounce(handleZoom),[])
  const getData = (
    product = '',
    startDate = '',
    endDate = '',
    ageRange = '',
    gender = '',
    zoomStart = '',
    zoomEnd = ''
  ) => {
    setLoading(true)
    Api.getVisualizationData(
      product,
      startDate,
      endDate,
      ageRange,
      gender,
      zoomStart,
      zoomEnd,
      token
    )
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setError(error)
      })
  }

  function handleZoom(event, x) {
    const new_x = event.transform.rescaleX(x)

    const visibleRangeArr = new_x.domain()
    const z1 = Math.round(visibleRangeArr[0])
    const z2 = Math.round(visibleRangeArr[1])
    const zoomStart = z1 < 0 ? 0 : z1
    const zoomEnd = z2 > 103 ? 103 : z2
    const visibleRangeObj = { zoomStart, zoomEnd }
    if (!loading) {
      const newFilters = { ...filters, zoomStart, zoomEnd }
      setFilters(newFilters)
      const { product, startDate, endDate, gender, ageRange } = filters
      getData(product, startDate, endDate, ageRange, gender, zoomStart, zoomEnd)
      navigation(`/${btoa(JSON.stringify(newFilters))}`)
    }
  }

  const onBarPress = (product) => {
    if (!loading) {
      const newFilters = { ...filters, product }
      setFilters(newFilters)
      const { startDate, endDate, gender, ageRange, zoomStart, zoomEnd } =
        filters
      getData(product, startDate, endDate, ageRange, gender, zoomStart, zoomEnd)
      navigation(`/${btoa(JSON.stringify(newFilters))}`)
    }
  }

  useEffect(() => {
    const paramsObj = JSON.parse(atob(chartFilters))
    const {
      product,
      startDate,
      endDate,
      ageRange,
      gender,
      zoomStart,
      zoomEnd,
    } = paramsObj
    setFilters({ ...paramsObj })
    getData(product, startDate, endDate, ageRange, gender, zoomStart, zoomEnd)
  }, [])

  const clearCharts = () => {
    d3.select(canvasRef.current).select('svg').remove()
    d3.select(lineRef.current).select('svg').remove()
  }

  useEffect(() => {
    if (!loading && data) {
      clearCharts()
      let lineData = data.info.map((d) => {
        return {
          day: new Date(d.day).toDateString(),
          A: d.a || d.b || d.c || d.d || d.e || d.f,
        }
      })
      let svg = d3.select(canvasRef.current).append('svg')
      let svg2 = d3.select(lineRef.current).append('svg')
      barChart(data.barInfo, svg, onBarPress)
      lineChart(lineData, svg2, handleZoom)
    }
  }, [data])

  // Handle new book add

  const handleWithGenderFilter = (e) => {
    const gender = e.target.value
    const { product, startDate, endDate, ageRange, zoomStart, zoomEnd } =
      filters
    const newFilters = { ...filters, gender }
    setFilters(newFilters)
    getData(product, startDate, endDate, ageRange, gender, zoomStart, zoomEnd)
    navigation(`/${btoa(JSON.stringify(newFilters))}`)
  }

  const handleWithAge = (e) => {
    const ageRange = e.target.value
    const { product, startDate, endDate, gender, zoomStart, zoomEnd } = filters
    const newFilters = { ...filters, ageRange }
    setFilters(newFilters)
    getData(product, startDate, endDate, ageRange, gender, zoomStart, zoomEnd)
    navigation(`/${btoa(JSON.stringify(newFilters))}`)
  }
  const handleWithDateRange = (value) => {
    const s = value[0]
    const e = value[1]
    if (s && e) {
      const startDate = s ? new Date(s['$d']).toISOString() : s
      const endDate = e ? new Date(e['$d']).toISOString() : e

      const { product, gender, zoomStart, ageRange, zoomEnd } = filters
      const newFilters = { ...filters, startDate, endDate }
      setFilters(newFilters)
      getData(product, startDate, endDate, ageRange, gender, zoomStart, zoomEnd)
      navigation(`/${btoa(JSON.stringify(newFilters))}`)
    }
  }

  const handleClearFilter = () => {
    setFilters(initialFilters)
    getData()
    navigation(`/${btoa(JSON.stringify(initialFilters))}`)
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
        }}
      >
        <Typography sx={{ fontSize: 18 }}>Filters:</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker onChange={handleWithDateRange} />
        </LocalizationProvider>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filters.ageRange}
            label="Age"
            onChange={handleWithAge}
            sx={{ width: '10rem' }}
          >
            <MenuItem value={'15-25'}>15-25</MenuItem>
            <MenuItem value={'>25'}>{'>25'}</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-gender">Gender</InputLabel>
          <Select
            labelId="select-gender"
            id="select-gender"
            value={filters.gender}
            placeholder="Gender"
            label="Gender"
            sx={{ width: '10rem' }}
            onChange={handleWithGenderFilter}
          >
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleClearFilter}>Clear</Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          pt: 10,
          pointerEvents: loading ? 'none' : 'initial',
          opacity: loading ? 0.6 : 1,
        }}
      >
        <div ref={canvasRef}></div>
        <div ref={lineRef} title="Double click for zoom"></div>
      </Box>
    </div>
  )
}

export default ZoomableLineChart
