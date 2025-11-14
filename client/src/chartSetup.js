import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

export function setupCharts() {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );
}