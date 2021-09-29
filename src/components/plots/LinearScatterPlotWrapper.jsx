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

function generateNoisyLine(n, mu=0, sigma=1) {
  let beta = [5, 0.6]; // coefficients
  let xMin = 1; // arbitrary for now
  let xMax = 10;
  let xPad = 0.3; // line extends past points to look pretty

  let err = normal(n, mu, sigma);
  let xNoise = uniform(n, xMin, xMax);
  let yNoise = xNoise.map((x, i) => beta[0] + (beta[1] * x) + err[i]);

  let x = [...Array(n).keys()];
  let randMin = d3.min(xNoise);
  let randMax = d3.max(xNoise);
  x = x.map(el => ((el + 0.5) * (((randMax - randMin) + (2 * xPad)) / n)) + (randMin - xPad)); // rescale
  let y = x.map(x => beta[0] + (beta[1] * x));

  return {
    noisy: xNoise.map((x, i) => { return({x: x, y: yNoise[i]}) }),
    true: x.map((x, i) => { return({x: x, y: y[i]}) })
  };
}

const data = generateNoisyLine(50, 0, 1.5);

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
        data={[noisyData, trueData]}
        dimensions={dimensions}
      />
    </Flex>
  );
}

export default LinearScatterPlotWrapper;
