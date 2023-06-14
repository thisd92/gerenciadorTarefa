import React from "react";
import { Chart, ArcElement, BarElement, LinearScale, CategoryScale } from 'chart.js';
import { ChartConfiguration, Legend, Tooltip } from 'chart.js'
import { Pie, Bar } from "react-chartjs-2";

Chart.register(BarElement, LinearScale, CategoryScale);
Chart.register(ArcElement, Tooltip, Legend)

interface DataItem {
    label: string;
    value: number;
}

interface PieChartProps {
    data: DataItem[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {

    const chartData = {
        labels: data.map((item) => item.label),
        datasets: [
            {
                labels: "Tasks",
                data: data.map((item) => item.value),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#8A2BE2",
                    "#00FF7F",
                    "#FFA500",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#8A2BE2",
                    "#00FF7F",
                    "#FFA500",
                ],
            },
        ],
    };
    const chartOptions: ChartConfiguration<"pie">["options"] = {
        plugins: {
            legend: {
                position: "bottom"
            },
        }
    }
    
    return (
        <div>
            <h2>Pie Chart</h2>
            <Pie data={chartData} options={chartOptions} />
        </div >
    );
};

interface BarChartProps {
    data: DataItem[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.label),
        datasets: [
            {
                label: "# of Tasks",
                data: data.map((item) => item.value),
                backgroundColor: "#36A2EB",
                borderColor: "#36A2EB",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                precision: 0,
            },
        },
    };

    return (
        <div>
            <h2>Bar Chart</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export { BarChart, PieChart };