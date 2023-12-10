'use client';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, PointElement,  LineElement, LinearScale, Title } from "chart.js";
import {Spinner} from '@nextui-org/react'
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export default function Bar() {
    const data = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
            {
                label: "# of Votes",
                data: [12, 19, 3],
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                borderWidth: 1,
            },
        ],
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'];
    const Linedata = {
        labels: labels,
        datasets: [
          {
            label: '',
            data: [65, 59, 80, 81, 56, 55, 40, 50, 60, 70, 80, 90],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top' as const,
          },
          title: {
            display: false,
            text: 'Chart.js Line Chart',
          },
        },
      };

    if (data) {
        return (
            <>
            <Line
                data={Linedata}
                options={options}
            />
            </>
        )
    }
    else {
        return (
            <div>
                <h1>Getting data</h1>
                <Spinner color='primary'/>
            </div>
        )
    }
}