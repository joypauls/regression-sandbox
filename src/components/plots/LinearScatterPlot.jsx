/** MultilineChart.js */
import React from "react";
import * as d3 from "d3";


const LinearScatterPlot = ({ data = [], dimensions = {} }) => {
  const svgRef = React.useRef(null);
  const { width, height, margin = {} } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  React.useEffect(() => {

    console.log(data);
    console.log([data[0]]);

    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(data[0].records, (d) => d.x) - 1,
        d3.max(data[0].records, (d) => d.x) + 1
      ])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data[0].records, (d) => d.y) - 1,
        d3.max(data[0].records, (d) => d.y) + 1
      ])
      .range([height - margin.bottom, 0]);
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // xAxisGroup.select(".domain").remove();
    // xAxisGroup.selectAll("line").attr("stroke", "rgba(0, 0, 0, 0.2)");
    // xAxisGroup
    //   .selectAll("text")
    //   .attr("opacity", 0.5)
    //   .attr("color", "black")
    //   .attr("font-size", "0.75rem");

    // Add Y grid lines with labels
    const yAxis = d3
      .axisLeft(yScale);
      // .ticks(5)
      // .tickSize(-width)
      // .tickFormat((val) => `${val}`);

    const yAxisGroup = svg.append("g").call(yAxis);

    // yAxisGroup.select(".domain").remove();
    // yAxisGroup.selectAll("line").attr("stroke", "rgba(0, 0, 0, 0.2)");
    // yAxisGroup
    //   .selectAll("text")
    //   .attr("opacity", 0.5)
    //   .attr("color", "black")
    //   .attr("font-size", "0.75rem");

    // Add X grid lines with labels
    const xAxis = d3
      .axisBottom(xScale);
      // .ticks(5)
      // .tickSize(-height + margin.bottom);
    
    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    // svg
    //   .selectAll(".line")
    //   .data(data)
    //   .enter()
    //   .append("path")
    //   .attr("fill", "none")
    //   .attr("stroke", (d) => d.color)
    //   .attr("stroke-width", 3)
    //   .attr("d", (d) => line(d.records));

    svg
      .selectAll("dot")
      .data(data[0].records)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return xScale(d.x); } )
      .attr("cy", function (d) { return yScale(d.y); } )
      .attr("r", 4)
      // .attr("transform", "translate(" + 100 + "," + 100 + ")");
      .style("fill", data[0].color);

    // setup line
    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    svg
    .selectAll(".line")
    .data([data[1]])
    .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", data[1].color)
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", "10,5")
      .attr("d", (d) => line(d.records));


  }, [data]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default LinearScatterPlot;
