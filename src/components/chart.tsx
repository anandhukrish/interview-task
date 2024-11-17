import { getTimeSeriesData } from "@/helper/getTimeSeriesData";
import { useAppSelector } from "@/store";
import { MappedCountryData, MappedStateData } from "@/store/covid/covid.slice";
import { Data, Layout } from "plotly.js";
import { useMemo } from "react";
import Plot from "react-plotly.js";

export function PieChart() {
  const { allCountrySummary, regionalData, selectedState } = useAppSelector(
    (state) => state.covid
  );

  const filteredData = regionalData.filter(
    (region) => region.state === selectedState
  );

  const covidDatatoBeShown: MappedCountryData | MappedStateData =
    filteredData.length === 0 ? allCountrySummary : filteredData[0];

  return (
    <div className="flex items-center justify-center">
      <Plot
        data={[
          {
            type: "pie",
            labels: ["Active", "Recovered", "Deaths"],
            values: [
              covidDatatoBeShown.activeCases ?? 0,
              covidDatatoBeShown.recovered ?? 0,
              covidDatatoBeShown.deaths ?? 0,
            ],
            hoverinfo: "label+percent",
            textinfo: "percent",
            textposition: "inside",
            marker: {
              colors: ["#eab308", "#33FF57", "#FF5733"],
            },
          },
        ]}
        useResizeHandler
        layout={{
          autosize: true,
          width: 450,
          height: 400,
          title: "COVID-19 Case Distribution",
          showlegend: true,
          margin: {
            pad: 20,
          },
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
      />
    </div>
  );
}

export function LineChart() {
  const { allCountrySummary, regionalData, selectedState } = useAppSelector(
    (state) => state.covid
  );

  const filteredData = regionalData.filter(
    (region) => region.state === selectedState
  );

  const covidDatatoBeShown: MappedCountryData | MappedStateData =
    filteredData.length === 0 ? allCountrySummary : filteredData[0];

  const timeSeriesData = useMemo(
    () => getTimeSeriesData(covidDatatoBeShown),
    [covidDatatoBeShown]
  );

  const activeCases = timeSeriesData.map((data) => data.activeCases);
  const deaths = timeSeriesData.map((data) => data.deaths);
  const total = timeSeriesData.map((data) => data.total);
  const recovered = timeSeriesData.map((date) => date.recovered);
  const dates = timeSeriesData.map((data) => data.date);

  const data: Data[] = useMemo(
    () => [
      {
        x: dates,
        y: activeCases,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "#3535cdec" },
        name: "Active Cases",
      },
      {
        x: dates,
        y: recovered,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "#9c9c2f" },
        name: "Recovered Cases",
      },
      {
        x: dates,
        y: deaths,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "#da3b3b" },
        name: "Deaths",
      },
      {
        x: dates,
        y: total,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "#1add1a" },
        name: "Total Cases",
      },
    ],
    [covidDatatoBeShown]
  );

  const layout: Partial<Layout> = useMemo(
    () => ({
      height: 500,
      width: 550,
      title: "COVID-19 Summary Line Chart",
      xaxis: { title: "Date" },
      yaxis: { title: "Count" },
      legend: { orientation: "h", x: 0.5, xanchor: "center", y: -0.2 },
      autosize: true,
      margin: {
        pad: 20,
      },
      hoverlabel: {
        font: {
          color: "#000",
        },
      },
    }),
    []
  );

  return (
    <div className="flex items-center justify-center">
      <Plot
        data={data}
        layout={layout}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        useResizeHandler
      />
    </div>
  );
}
