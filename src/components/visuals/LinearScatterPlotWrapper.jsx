/** App.js */
import React from "react";
import {
  Flex
} from "@chakra-ui/react";
import * as d3 from "d3";

import LinearScatterPlot from "./LinearScatterPlot";


function uniform(n, a, b) {
  let gen = d3.randomUniform(a, b);
  let data = [];
  for (let i = 0; i < n; i++) {
    data.push(gen());
  }
  return data;
}

function normal(n, mu=0, sigma=1, clip=false) {
  let gen = d3.randomNormal(mu, sigma);
  let data = [];
  for (let i = 0; i < n; i++) {
    let sample = gen();
    // apply clipping at 2.5*sigma
    if (clip === true) {
      let bound = 2.5 * sigma;
      if (sample > bound) {
        sample = bound;
      } else if (sample < -bound) {
        sample = -bound;
      }
    }
    data.push(sample);
  }
  return data;
}

const lineOutput = (x, beta0, beta1) => {
  return(x.map(x => beta0 + (beta1 * x)));
}

const leastSquares = (x, y) => {
  let xBar = d3.mean(x);
  let yBar = d3.mean(y);
  let ssxy = d3.sum(x.map((x, i) => {
    return( (x - xBar) * (y[i] - yBar) );
  }));
  let ssxx = d3.sum(x.map((x) => {
    return( (x - xBar) ** 2 );
  }));
  let beta1 = ssxy / ssxx;
  
  return([yBar - (beta1 * xBar), beta1]);
}

// linear regression data
function generateLinearData(n, mu=0, sigma=1) {
  let betaTrue = [5, 0.6]; // coefficients
  let xMin = 1; // arbitrary for now
  let xMax = 10;
  let xPad = 0.3; // line extends past points to look pretty

  let err = normal(n, mu, sigma);
  let xSample = uniform(n, xMin, xMax);
  let ySample = xSample.map((x, i) => betaTrue[0] + (betaTrue[1] * x) + err[i]);

  // endpoints for d3 to draw the line segments
  let x = [d3.min(xSample) - xPad, d3.max(xSample) + xPad];
  let y = lineOutput(x, betaTrue[0], betaTrue[1]);

  let betaHat = leastSquares(xSample, ySample);
  let yHat = lineOutput(x, betaHat[0], betaHat[1]);

  return {
    // the actual generated data points
    samples: { records: xSample.map((x, i) => { return({x: x, y: ySample[i]}); }) },
    // endpoints for line segments
    true: { points: [[x[0], y[0]], [x[1], y[1]]] },
    fit: { points: [[x[0], yHat[0]], [x[1], yHat[1]]] },
  }
}

const data = generateLinearData(50, 0, 1.5);
data.samples.fill = "#5579ed";
data.true.stroke = "#000000";
data.fit.stroke = "#de9516";


const dimensions = {
  width: 600,
  height: 500,
  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 40
  }
};

const LinearScatterPlotWrapper = () => {
  return (
    <Flex className="main-plot" justify="center">
      <LinearScatterPlot
        data={data}
        dimensions={dimensions}
      />
    </Flex>
  );
}

export default LinearScatterPlotWrapper;
