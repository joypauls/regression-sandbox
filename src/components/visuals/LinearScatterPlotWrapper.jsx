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
  let trueBeta = [5, 0.6]; // coefficients
  let xMin = 1; // arbitrary for now
  let xMax = 10;
  let xPad = 0.3; // line extends past points to look pretty

  let err = normal(n, mu, sigma);
  let xNoise = uniform(n, xMin, xMax);
  let yNoise = xNoise.map((x, i) => trueBeta[0] + (trueBeta[1] * x) + err[i]);

  let randMin = d3.min(xNoise);
  let randMax = d3.max(xNoise);
  let x = [...Array(n).keys()];
  x = x.map(el => ((el + 0.5) * (((randMax - randMin) + (2 * xPad)) / n)) + (randMin - xPad)); // rescale
  let y = lineOutput(x, trueBeta[0], trueBeta[1]);

  let betaHat = leastSquares(xNoise, yNoise);
  let yHat = lineOutput(x, betaHat[0], betaHat[1]);

  return {
    noisy: xNoise.map((x, i) => { return({x: x, y: yNoise[i]}); }),
    true: x.map((x, i) => { return({x: x, y: y[i]}); }),
    fit: x.map((x, i) => { return({x: x, y: yHat[i]}); })
  };
}

const data = generateLinearData(50, 0, 1.5);

const noisyData = {
  name: "Noise",
  color: "#5579ed",
  records: data.noisy
};

const trueData = {
  name: "True Function",
  color: "#000000",
  records: data.true
};

const fitData = {
  name: "Fit",
  color: "#ed9e4e",
  records: data.fit
};

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
        data={[noisyData, trueData, fitData]}
        dimensions={dimensions}
      />
    </Flex>
  );
}

export default LinearScatterPlotWrapper;
