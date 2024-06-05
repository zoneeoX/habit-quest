import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineGraph = () => {

  
  const cfg = {
    type: "line",
    data: {
      datasets: [
        {
          data: [
            { x: "2016-12-25", y: 20 },
            { x: "2016-12-26", y: 10 },
          ],
        },
      ],
    },
  };

  const options = {};
  const data = {};

  return <Line />;
};
