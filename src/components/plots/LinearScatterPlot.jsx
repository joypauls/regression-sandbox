import React from "react";
import * as d3 from "d3";


const makeXScale = (data, length) => {
  let padding = 0.5;
  return(
    d3.scaleLinear()
      .domain([
        d3.min(data, (d) => d.x) - padding,
        d3.max(data, (d) => d.x) + padding
      ])
      .range([0, length])
  );
}

const makeYScale = (data, length) => {
  let padding = 0.5;
  return(
    d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.y) - padding,
        d3.max(data, (d) => d.y) + padding
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
  let pointSize = 6;
  let pointSizeHover = 10;
  let pointOpacity = 0.8;
  let pointOpacityHover = 1;
  let pointColor = "#000000";

  svg
    .selectAll("dot")
    .data(data.records)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d.x); } )
    .attr("cy", function (d) { return yScale(d.y); } )
    .attr("r", pointSize)
    .attr("opacity", `${pointOpacity}`)
    .style("fill", data.color)
    .property("selected", false)

    // interaction effects
    .on("mouseover", function (e, p) {
      d3.select(this).transition()
        .duration("50")
        .attr("opacity", `${pointOpacityHover}`)
        .attr("r", pointSizeHover)
        .attr("stroke", pointColor);
    })
    .on("mouseout", function (e, p) {
      if (!d3.select(this).property("selected")) {
        d3.select(this).transition()
          .duration("50")
          .attr("opacity", `${pointOpacity}`)
          .attr("r", pointSize)
          .attr("stroke", "transparent");
      }
    })
    .on("click", function (e, p) {
      // d3.select(this).property("selected", true);
      console.log(d3.select(this).property("selected"));
      console.log(p);
      console.log(this);
      if (d3.select(this).property("selected")) {
        d3.select(this).property("selected", false);
        d3.select(this)
          .transition()
          .duration("50")
          // .style("fill", data.color)
          .attr("opacity", pointOpacity)
          .attr("r", pointSize)
          .attr("stroke", "transparent");
      } else {
        d3.select(this).property("selected", true);
        d3.select(this)
          .transition()
          .duration("50")
          // .style("fill", "red")
          .attr("opacity", pointOpacityHover)
          .attr("r", pointSizeHover)
          .attr("stroke", pointColor);
      }

      // d3.select(this).attr("isSelected", "true");
      // d3.select(this).transition()
      //   .duration("50")
      //   .style("fill", "red");
        // .attr("opacity", `${pointOpacityHover}`)
        // .attr("r", pointSizeHover)
        // .attr("stroke", pointColor);
      
      // console.log(d3.select(this).attr("selected"));
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
    .attr("stroke-dasharray", "6,3")
    .attr("opacity", 0.8)
    .attr("d", (d) => line(d.records));
}


const LinearScatterPlot = ({ data = [], dimensions = {} }) => {
  // const {selected}

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
