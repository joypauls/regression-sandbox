/** App.js */
import React from "react";
import {
  Flex
} from "@chakra-ui/react";

import LinearScatterPlot from "./LinearScatterPlot";

import * as d3 from "d3";

function gaussianNoise(n, mu=0, sigma=1, clip=false) {
  let gen = d3.randomNormal(mu, sigma);
  let data = [];
  for (let i = 0; i < n; i++) {
    let sample = gen();
    // apply clipping at 2.5*sigma
    if (clip === true) {
      let bound = 2.5*sigma;
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

function generateTestData(n, mu=0, sigma=1) {
  let xMax = 9; // arbitrary for now
  let x = [...Array(n).keys()];
  x = x.map(el => el * (xMax / n) + 1); // scale
  let err = gaussianNoise(x.length, mu, sigma)
  let beta = [5, 0.6]; // coefficients
  let y = x.map(el => beta[0] + (beta[1] * el));
  let yNoise = y.map((el, i) => el + err[i]); // scale

  return {
    noisy: x.map((x, i) => { return({x: x, y: yNoise[i]}) }),
    true: x.map((x, i) => { return({x: x, y: y[i]}) })
  };
}

const data = generateTestData(100, 0, 1.5);

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
    top: 30,
    right: 30,
    bottom: 30,
    left: 60
  }
};

const LinearScatterPlotWrapper = () => {
  return (
    <Flex className="MainPlot" justify="center">
      <LinearScatterPlot
        data={[noisyData, trueData]}
        dimensions={dimensions}
      />
    </Flex>
  );
}

export default LinearScatterPlotWrapper;
