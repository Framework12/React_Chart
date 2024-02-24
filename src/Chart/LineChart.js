import React from "react";
import * as d3 from "d3";
import jsonData from "../jsondata.json"

const LineChart = () => {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const x = d3
    .scaleLinear()
    .domain(d3.extent(jsonData, (d) => d.Year))
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(jsonData, (d) => d.Intensity))
    .range([height, 0]);

  const line = d3
    .line()
    .x((d) => x(d.Year))
    .y((d) => y(d.Intensity));

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g
        className="chart-container"
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        <path className="chart-path" d={line(jsonData)} />
        {jsonData.map((d, i) => (
          <g key={i} className="data-point">
            <circle cx={x(d.Year)} cy={y(d.Intensity)} r={5} />
            <text
              className="data-point-label"
              x={x(d.Year) + 5}
              y={y(d.Intensity) - 5}
            >
              {d.Year}
            </text>
            <text
              className="data-point-label"
              x={x(d.Year) + 5}
              y={y(d.Intensity) + 5}
            >
              {d.Intensity}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default LineChart;
