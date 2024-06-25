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
                    "#87CEFA",
                    "#F0E68C",
                    "#00FF7F",
                ],
                hoverBackgroundColor: [
                    "#87CEFA",
                    "#F0E68C",
                    "#00FF7F",
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
            <h2>Tasks</h2>
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
                label: "# of Projects",
                data: data.map((item) => item.value),
                backgroundColor: [
                    "#87CEFA",
                    "#F0E68C",
                    "#00FF7F",
                ],
                borderColor: "#FFFAFA",
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
            <h2>Projetos</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export { BarChart, PieChart };