import { Data, Layout } from "plotly.js";
import Plot from "react-plotly.js";

export function PieChart() {
  return (
    <div className="flex items-center justify-center">
      <Plot
        data={[
          {
            type: "pie",
            labels: ["Active", "Recovered", "Deaths"],
            values: [300, 450, 150],
            hoverinfo: "label+percent",
            hoverlabel: {},
            textinfo: "percent",
            textposition: "inside",
            marker: {
              colors: ["#FF5733", "#33FF57", "#FF33FF"],
            },
          },
        ]}
        layout={{
          height: 500,
          width: 500,
          autosize: true,
          margin: {
            pad: 20,
          },
        }}
        config={{
          displayModeBar: false,
        }}
      />
    </div>
  );
}

export function LineChart() {
  const data: Data[] = [
    {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: "scatter",
    },
  ];

  const layout: Partial<Layout> = { height: 500, width: 500 };

  return (
    <div>
      <Plot data={data} layout={layout} />
    </div>
  );
}
