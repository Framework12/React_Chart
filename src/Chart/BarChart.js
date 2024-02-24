import React, { useMemo } from "react";
import * as d3 from "d3";

const BarChart = ({ data, width, height }) => {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const scales = useMemo(() => {
    const xScale = d3
      .scaleBand()
      .range([0, width - margin.left - margin.right])
      .domain(data.map((d) => d.Year))
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.Intensity)])
      .range([height - margin.top - margin.bottom, 0]);

    return { xScale, yScale };
  }, [data, width, height, margin]);

  const { xScale, yScale } = scales;

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      {data.map((d) => (
        <g key={`${d.Year}-${d.Intensity}`}>
          <rect
            x={xScale(d.Year)}
            y={yScale(d.Intensity)}
            width={xScale.bandwidth()}
            height={height - margin.top - margin.bottom - yScale(d.Intensity)}
            fill="steelblue"
          />
          <text
            x={xScale(d.Year) + xScale.bandwidth() / 2}
            y={yScale(d.Intensity) - 10}
            textAnchor="middle"
            fontSize="12px"
          >
            {d.Year}
          </text>
          <text
            x={xScale(d.Year) + xScale.bandwidth() / 2}
            y={yScale(d.Intensity) + 20}
            textAnchor="middle"
            fontSize="12px"
          >
            {d.Intensity}
          </text>
        </g>
      ))}
      <g transform={`translate(0, ${height - margin.top - margin.bottom})`}>
        <line x1={0} y1={0} x2={width - margin.left - margin.right} y2={0} stroke="gray" />
        {xScale.domain().map((tick) => (
          <g key={tick} transform={`translate(${xScale(tick)}, -10)`}>
            <line y1={0} y2={0} stroke="gray" />
            <text dy=".71em" textAnchor="middle">
              {tick}
            </text>
          </g>
        ))}
      </g>
      <g transform={`translate(${width - margin.left - margin.right}, 0)`}>
        <line x1={0} y1={0} x2={0} y2={height - margin.top - margin.bottom} stroke="gray" />
        {yScale.ticks().map((tick) => (
          <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
            <line x1={0} x2={-6} stroke="gray" />
            <text x={-9} dy=".32em" textAnchor="end">
              {tick}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
};

export default BarChart;
