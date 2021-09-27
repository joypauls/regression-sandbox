import React from "react";
import * as d3 from "d3";


const makeXScale = (data, length) => {
  return(
    d3.scaleLinear()
      .domain([
        d3.min(data, (d) => d.x) - 1,
        d3.max(data, (d) => d.x) + 1
      ])
      .range([0, length])
  );
}

const makeYScale = (data, length) => {
  return(
    d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.y) - 1,
        d3.max(data, (d) => d.y) + 1
      ])
      .range([length, 0])
  );
}

const drawAxes = (svg, xScale, yScale, svgEndY) => {
  // y axis
  let yAxis = d3.axisLeft(yScale);
  svg.append("g").call(yAxis);
  // x axis
  let xAxis = d3.axisBottom(xScale);
  svg.append("g")
    .attr("transform", `translate(0, ${svgEndY})`)
    .call(xAxis);
}

const drawPoints = (data, svg, xScale, yScale) => {
  let pointSize = 5;
  let pointSizeHover = 10;
  let pointOpacity = 1;
  let pointOpacityHover = 0.7;
  let pointColor = "#000000";

  svg
    .selectAll("dot")
    .data(data.records)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d.x); } )
    .attr("cy", function (d) { return yScale(d.y); } )
    .attr("r", pointSize)
    .style("fill", data.color)
    // hover effects
    .on("mouseover", function (d, i) {
      d3.select(this).transition()
        .duration("50")
        .attr("opacity", `${pointOpacityHover}`)
        .attr("r", pointSizeHover)
        .attr("stroke", pointColor);
    })
    .on("mouseout", function (d, i) {
      d3.select(this).transition()
        .duration("50")
        .attr("opacity", `${pointOpacity}`)
        .attr("r", pointSize)
        .attr("stroke", "transparent");
    });
}

const drawLine = (data, svg, line) => {
  let width = 3;
  svg
    .selectAll(".line")
    .data([data])
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", data.color)
    .attr("stroke-width", width)
    .attr("stroke-dasharray", "10,5")
    .attr("d", (d) => line(d.records));
}


const LinearScatterPlot = ({ data = [], dimensions = {} }) => {
  const svgRef = React.useRef(null);
  const { width, height, margin = {} } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  const svgEndY = height - margin.bottom;

  React.useEffect(() => {

    const xScale = makeXScale(data[0].records, width);
    const yScale = makeYScale(data[0].records, svgEndY);

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements
    const svg = svgEl.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // add x and y axes
    drawAxes(svg, xScale, yScale, svgEndY);

    // add points
    drawPoints(data[0], svg, xScale, yScale);

    // add line
    drawLine(data[1], svg, d3.line().x((d) => xScale(d.x)).y((d) => yScale(d.y)))

  }, [data]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default LinearScatterPlot;
