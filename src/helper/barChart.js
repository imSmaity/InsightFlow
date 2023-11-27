import * as d3 from 'd3'
import _ from 'lodash'

const barChart = (data, svg, onBarPress) => {
  let margin = { top: 20, right: 20, bottom: 30, left: 80 }
  let svgWidth = 600,
    svgHeight = 350
  let height = svgHeight - margin.top - margin.bottom,
    width = svgWidth - margin.left - margin.right
  let sourceNames = Object.keys(data),
    sourceCount = Object.values(data)

  let x = d3.scaleLinear().rangeRound([0, width]),
    y = d3.scaleBand().rangeRound([0, height]).padding(0.1)

  x.domain([
    0,
    d3.max(sourceCount, function (d) {
      return d
    }),
  ])
  y.domain(sourceNames)

  svg.attr('height', svgHeight).attr('width', svgWidth)

  svg = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  svg
    .append('g')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisBottom(x))

  svg.append('g').call(d3.axisLeft(y))

  // Create rectangles
  let bars = svg.selectAll('.bar').data(sourceNames).enter().append('g')

  bars
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) {
      return 0
    })
    .attr('y', function (d) {
      return y(d)
    })
    .attr('width', function (d) {
      // Decrease the width by a factor (e.g., 0.8)
      return x(data[d]) * 0.8
    })
    .attr('height', function (d) {
      // Decrease the height by a factor (e.g., 0.8)
      return y.bandwidth() * 0.8
    })
    .attr('fill', function (d) {
      // Set different colors based on the height or other criteria
      if (data[d] < _.max(sourceCount)) {
        return '#033d8f'
      } else {
        return '#692701'
      }
    })
    .on('click', function (event, d) {
      onBarPress(String(d).toLowerCase())
    })

  bars
    .append('text')
    .text(function (d) {
      return data[d]
    })
    .attr('x', function (d) {
      return x(data[d]) - 40
    })
    .attr('y', function (d) {
      return y(d) + y.bandwidth() * (0.5 + 0.1) // here 0.1 is the padding scale
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '14px')
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
}

export default barChart
