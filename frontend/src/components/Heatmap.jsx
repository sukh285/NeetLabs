import React from "react";
import HeatMap from "@uiw/react-heat-map";
import Tooltip from "@uiw/react-tooltip";
import moment from "moment";

const SubmissionHeatmap = ({ data }) => {
  console.log(data);

  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-500">No submission activity yet.</p>;
  }

  // Transform the format from: { date: "YYYY-MM-DD", submissions: X }
  const transformed = data.map(({ date, submissions }) => ({
    date: moment(date, ["MMM D", "MMM D, YYYY"])
      .year(new Date().getFullYear()) // Ensure current year
      .format("YYYY/MM/DD"),
    count: submissions,
  }));

  const panelColors = {
    0: "#f5f5f5", // very light gray
    1: "#ffe0b2", // light orange
    3: "#ffb74d", // medium orange
    5: "#ff9800", // strong orange
    10: "#e65100", // dark orange
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-neet-neutral p-4 border border-neet-primary my-10 shadow-md">
      <h2 className="text-lg font-semibold text-neet-base-100 mb-4">
        Submission Activity
      </h2>
      <div className="min-w-[700px]">
        <HeatMap
          value={transformed}
          startDate={new Date(transformed[0].date)}
          rectSize={16}
          space={3}
          width={900}
          height={200}
          style={{
            width: "100%",
            paddingBottom: "10px",
            minHeight: "100%",
            minWidth: 600,
            maxWidth: "100%",
          }}
          weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          monthLabels={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]}
          panelColors={panelColors}
          rectRender={(props, item) => (
            <Tooltip
              key={props.key}
              placement="top"
              content={`${item.count || 0} submission${
                item.count === 1 ? "" : "s"
              }`}
            >
              <rect {...props} rx={4} ry={4} />
            </Tooltip>
          )}
        />
      </div>

      {/* Label color override */}
      <style>
        {`
          .w-heatmap text {
            fill: white !important;
            font-size: 12px;
          }
        `}
      </style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12 }}>Less</span>
          <div
            style={{
              width: 24,
              height: 16,
              background: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          ></div>
          <div
            style={{
              width: 48,
              height: 8,
              background:
                "linear-gradient(to right, #f5f5f5, #ffe0b2, #ffb74d, #ff9800, #e65100)",
              borderRadius: 4,
              margin: "0 4px",
            }}
          ></div>
          <div
            style={{
              width: 24,
              height: 16,
              background: "#e65100",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          ></div>
          <span style={{ fontSize: 12 }}>More</span>
        </div>
      </div>
    </div>
  );
};

export default SubmissionHeatmap;
