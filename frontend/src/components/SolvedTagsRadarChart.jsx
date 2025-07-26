import React from "react";
import { RadarChart } from "@mui/x-charts/RadarChart";

const SolvedTagsRadarChart = ({ solvedTags }) => {
  if (!solvedTags || solvedTags.length === 0) {
    return (
      <div className="text-neet-accent/50 text-sm text-center">
        No tag data available yet.
      </div>
    );
  }

  // Find the max count for all tags for axis scaling
  const maxCount = Math.max(...solvedTags.map((t) => t.count)) + 2;

  // Metrics as per MUI X docs: array of objects with name and max
  const metrics = solvedTags.map((tag) => ({
    name: tag.tag,
    max: maxCount,
  }));

  const data = solvedTags.map((tag) => tag.count);

  return (
    <div className="flex justify-center items-center">
      <RadarChart
        height={300}
        series={[
          {
            label: "Solved",
            data,
            color: "#ff9800", // neet-primary (same as SubmissionLineChart)
            area: { // fill area color
              color: "#ff9800",
              opacity: 0.18,
            },
            // Optionally, you can hide marks for a cleaner look
            hideMark: false,
            fillArea: true,
          },
        ]}
        radar={{
          metrics,
        }}
        divisions={5}
        shape="circular"
        slotProps={{
          tooltip: { trigger: "axis" },
        }}
        sx={{
            backgroundColor: "rgba(245, 245, 245, 1)",
            borderRadius: "0.75rem",
            padding: "1rem",
            // Grid lines (concentric circles or polygons)
            "& .MuiChartsGrid-line": {
              stroke: "#ffe0b2",
              strokeDasharray: "9 9",
            },
            // Radial axis lines
            "& .MuiChartsAxisLine-root": {
              stroke: "#ff9800",
            },
            // Axis tick labels (the numbers like 2, 4, 6, etc.)
            "& .MuiChartsAxisTickLabel-root": {
              fill: "#ff9800",
              fontWeight: 500,
            },
            // Metric labels (the ones on the outside like "Math", "English"...)
            "& .MuiChartsRadarMetricLabel-root": {
              fill: "#ff9800",
              color: "#ffffff",
              stroke: "#ffffff",
              fontWeight: 500,
            },
            // Radar shape and marks
            "& .MuiChartsRadarPolygon-root": {
              stroke: "#ff9800",
              fill: "#ff9800",
              fillOpacity: 0.18,
            },
            "& .MuiChartsRadarMark-root": {
              fill: "#ff9800",
              stroke: "#ff9800",
              strokeWidth: 1.5,
            },
            // Tooltip
            "& .MuiChartsTooltip-root": {
              backgroundColor: "#ffe0b2",
              color: "#232323",
              borderRadius: "6px",
            },
            // Legend text
            "& .MuiChartsLegend-root": {
              color: "#000",
              fontWeight: 600,
              fontFamily: "Inter"
            },
          }}
          
      />
    </div>
  );
};

export default SolvedTagsRadarChart;
