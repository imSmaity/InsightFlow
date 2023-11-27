import * as d3 from 'd3'

const barChart = (data, svg) => {
  let margin = { top: 20, right: 20, bottom: 30, left: 80 }
  let svgWidth = 720,
    svgHeight = 300
  let height = svgHeight - margin.top - margin.bottom,
    width = svgWidth - margin.left - margin.right
  let sourceNames = [],
    sourceCount = []

  let x = d3.scaleLinear().rangeRound([0, width]),
    y = d3.scaleBand().rangeRound([0, height]).padding(0.1)
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      sourceNames.push(key)
      sourceCount.push(parseInt(data[key]))
    }
  }
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
      return x(data[d])
    })
    .attr('height', function (d) {
      return y.bandwidth()
    })

  bars
    .append('text')
    .text(function (d) {
      return data[d]
    })
    .attr('x', function (d) {
      return x(data[d]) + 15
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
