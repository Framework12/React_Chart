import React from 'react';
import * as d3 from 'd3';

const DoughnutChart = ({ data }) => {

  const intensities = data.map(item => item.intensity);
  
  const totalIntensity = intensities.reduce((acc, curr) => acc + curr, 0);

  const colorScale = d3.scaleOrdinal()
    .domain(intensities)
    .range(d3.schemeCategory10);

  const arc = d3.arc()
    .outerRadius(100)
    .innerRadius(50)
    .padAngle(0.02)
    .cornerRadius(5);

  const pie = d3.pie()
    .sort(null)
    .value(d => d);

  return (
    <svg width={200} height={200}>
      <g transform={`translate(100, 100)`}>
        {pie(intensities).map((slice, index) => (
          <path key={index} d={arc(slice)} fill={colorScale(slice.data)} />
        ))}
        <text
          x={0}
          y={0}
          fontSize={14}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {totalIntensity}
        </text>
      </g>
    </svg>
  );
};

export default DoughnutChart;
