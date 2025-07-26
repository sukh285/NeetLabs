import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const DifficultyPieChart = ({ stats }) => {
  console.log(stats);
  
  const data = [
    { id: 0, value: stats?.EASY || 0, label: "Easy", color: "#05df72" },     // neet-success
    { id: 1, value: stats?.MEDIUM || 0, label: "Medium", color: "#fdc700" }, // neet-warning
    { id: 2, value: stats?.HARD || 0, label: "Hard", color: "#ff6467" },     // neet-error
  ];

  return (
    <PieChart
      height={330}
      series={[
        {
          data,
          innerRadius: 40,
          outerRadius:100,
          paddingAngle: 5,
          cornerRadius: 6,
          startAngle: -90,
          endAngle: 270,
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 20,
          arcLabelRadius: "50%",
        },
      ]}
      sx={{
        "& .MuiChartsLegend-root": {
          color: "#ffe0b2", // neet-accent
        },
        "& .MuiPieArc-label": {
          fill: "#000",    // neet-accent-content
          fontWeight: "bold",
          fontSize: 13,
        },
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Optional card bg
        borderRadius: "0.75rem",
        padding: "1rem",
      }}
    />
  );
};

export default DifficultyPieChart;
