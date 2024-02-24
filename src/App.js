import React, { useState } from "react";
import jsonData from "./jsondata.json";
import BarChart from "./Chart/BarChart";
import LineChart from "./Chart/LineChart";
import DoughnutChart from "./Chart/DoughnutChart";

const App = () => {
  const [endYearFilter, setEndYearFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [pestFilter, setPestFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [swotFilter, setSwotFilter] = useState("");

  const applyFilters = (data) => {
    return data.filter((item) => {
      return (
        (endYearFilter === "" || item.end_year === endYearFilter) &&
        (topicFilter === "" || item.topic === topicFilter) &&
        (sectorFilter === "" || item.sector === sectorFilter) &&
        (regionFilter === "" || item.region === regionFilter) &&
        (pestFilter === "" || item.pestle === pestFilter) &&
        (sourceFilter === "" || item.source === sourceFilter) &&
        (swotFilter === "" || item.swot === swotFilter)
      );
    });
  };

  const filteredData = applyFilters(jsonData);

  const intensityData = filteredData.map((item) => item.intensity);
  const likelihoodData = filteredData.map((item) => item.likelihood);
  const relevanceData = filteredData.map((item) => item.relevance);
  const yearData = filteredData.map((item) =>
    new Date(item.published).getFullYear()
  );
  const countryData = filteredData.map((item) => item.country);
  const topicData = filteredData.map((item) => item.topic);
  const regionData = filteredData.map((item) => item.region);

  return (
    <div>
      <select
        value={endYearFilter}
        onChange={(e) => setEndYearFilter(e.target.value)}
      >
        <option value="">Select End Year</option>

        {jsonData.map((item) => (
          <option key={item.id} value={item.end_year}>
            {item.end_year}
          </option>
        ))}
      </select>
      

      <LineChart data={intensityData} />
      <BarChart data={likelihoodData} />
      <DoughnutChart data={relevanceData} />
      <LineChart data={yearData} />
      <BarChart data={countryData} />
      <DoughnutChart data={topicData} />
      <LineChart data={regionData} />
    </div>
  );
};

export default App;
