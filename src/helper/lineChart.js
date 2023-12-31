import * as d3 from 'd3'

const lineChart = (data, svg, handleZoom) => {
  const margin = { top: 20, right: 20, bottom: 30, left: 80 }
  const svgWidth = 600,
    svgHeight = 350
  const height = svgHeight - margin.top - margin.bottom,
    width = svgWidth - margin.left - margin.right

  const sourceNames = []
  const sourceCount = []

  data.forEach((value) => {
    sourceNames.push(value.day)
    sourceCount.push(value.A)
  })

  const x = d3.scaleLinear().rangeRound([0, width])
  const y = d3.scaleLinear().rangeRound([height, 0])

  x.domain([0, sourceNames.length - 1])
  y.domain([0, d3.max(sourceCount)])

  svg.attr('height', svgHeight).attr('width', svgWidth)

  const g = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  g.append('g')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisBottom(x).tickFormat((d, i) => sourceNames[i]))

  g.append('g').call(d3.axisLeft(y))

  // Create horizontal background lines for each point
  g.selectAll('.background-line-y')
    .data(y.ticks())
    .enter()
    .append('line')
    .attr('class', 'background-line background-line-y')
    .attr('x1', 0)
    .attr('y1', (d) => y(d))
    .attr('x2', width)
    .attr('y2', (d) => y(d))
    .attr('stroke', '#ddd')
    .attr('stroke-width', 1)

  // Create line
  const line = d3
    .line()
    .x((d, i) => x(i))
    .y((d) => y(d))

  g.append('path')
    .datum(sourceCount)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 2)
    .attr('d', line)

  // Create circles for data points
  g.selectAll('circle')
    .data(sourceCount)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => x(i))
    .attr('cy', (d) => y(d))
    .attr('r', 5)
    .attr('fill', 'steelblue')

  // Add zoom behavior
  const zoom = d3
    .zoom()
    .scaleExtent([1, 10]) // Set the scale extent as needed
    .on('zoom', (event) => handleZoom(event, x))

  svg.call(zoom)
}

export default lineChart
