import React from "react";
import { Pie } from "react-chartjs-2";

const GenrePieChart = ({ data }) => {
  if (!data) return <p>Loading chart...</p>;

  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default GenrePieChart;