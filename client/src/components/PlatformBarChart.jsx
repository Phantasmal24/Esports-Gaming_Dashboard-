import React from "react";
import { Bar } from "react-chartjs-2";

const PlatformBarChart = ({ data }) => {
  if (!data) return <p>Loading chart...</p>;

  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Platform Popularity",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PlatformBarChart;