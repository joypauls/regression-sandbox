/** App.js */
import React from "react";
import {
  Flex
} from '@chakra-ui/react';

import TestChart from "./testChart";

import * as d3 from "d3";

function gaussianNoise(n, mu=0, sigma=1, clip=true) {
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

function generateTestData(n, dim, mu=0, sigma=1) {
  let xMax = 10; // arbitrary for now
  
  let x = [...Array(n).keys()];
  x = x.map(x => x * (10 / n))
  // let y = x.map(el => (Math.sin((0.017 * el) - 1)) );
  let y = gaussianNoise(x.length, mu, sigma)
  // let noisyY = y.map((el, i) => (el + noise[i]))
  // let smoothedY = convolve1D(noisyY);

  // let rangeScale = d3.scaleLinear().domain([d3.min(noisyY), d3.max(noisyY)]).range([0, INNER_HEIGHT]);
  // let domainScale = d3.scaleLinear().domain([d3.min(x), d3.max(x)]).range([0, WIDTH]);
  // let scaledY = y.map((d) => (dim.HEIGHT - rangeScale(d) - HEIGHT_PAD));
  // let scaledX = x.map((d) => domainScale(d));

  // return {x: scaledX, y: scaledY};

  let data = x.map((x, i) => { return({x: x, y: y[i]}) });
  // console.log(data);
  // console.log(data.items);
  return data;
}

const data = {
  name: "Test",
  color: "#32a85e",
  records: generateTestData(100)
};

const dimensions = {
  width: 600,
  height: 300,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60
  }
};

const Plot = () => {
  return (
    <Flex className="MainPlot" justifyContent="center">
      <TestChart
        data={[data]}
        dimensions={dimensions}
      />
    </Flex>
  );
}

export default Plot;
