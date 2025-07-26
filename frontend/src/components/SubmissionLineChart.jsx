import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const SubmissionLineChart = ({ data }) => {
  const xLabels = data?.map((entry) => entry.date) || [];
  const values = data?.map((entry) => entry.submissions) || [];

  return (
    <div className="flex justify-center items-center">
      <LineChart
        height={300}
        grid={{ horizontal: true }} // ✅ enable grid
        xAxis={[
          {
            scaleType: "point",
            data: xLabels,
            tickLabelStyle: { fill: "#fff" }, // neet-base-100
            
          },
        ]}
        yAxis={[
          {
            position: "right", // ✅ move to right
            tickLabelStyle: { fill: "#f5f5f5" },
          },
        ]}
        series={[
          {
            data: values,
            label: "Submissions",
            color: "#ff9800", // neet-primary
            curve: "monotoneX", // optional interpolation
          },
        ]}
        
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.4)", // neet-neutral + alpha
          borderRadius: "0.75rem",
          padding: "1rem",
          "& .MuiChartsGrid-line": {
            stroke: "#ffe0b2", // neet-accent
            strokeDasharray: "9 9", // ✅ dotted
          },
          "& .MuiChartsAxisLine-root": {
            stroke: "#ffe0b2", // axis lines
          },
          "& .MuiChartsLegend-root": {
            color: "#ffe0b2", // legend
          },
          "& .MuiChartsTooltip-root": {
            backgroundColor: "#ffe0b2",
            color: "#232323", // tooltip text
            borderRadius: "6px",
          },
        }}
      />
    </div>
  );
};

export default SubmissionLineChart;
