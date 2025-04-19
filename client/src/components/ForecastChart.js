import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const ForecastChart = ({ forecast }) => {
  if (!forecast) return null

  // Extract data for the chart
  const dates = Object.keys(forecast)
  const temperatures = dates.map((date) => {
    // Get the average temperature for each day
    const dayForecasts = forecast[date]
    const temps = dayForecasts.map((item) => item.main.temp)
    return temps.reduce((sum, temp) => sum + temp, 0) / temps.length
  })

  // Get min and max temperatures for each day
  const minTemps = dates.map((date) => {
    const dayForecasts = forecast[date]
    return Math.min(...dayForecasts.map((item) => item.main.temp_min))
  })

  const maxTemps = dates.map((date) => {
    const dayForecasts = forecast[date]
    return Math.max(...dayForecasts.map((item) => item.main.temp_max))
  })

  const data = {
    labels: dates.map((date) =>
      new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    ),
    datasets: [
      {
        label: "Average Temperature (°F)",
        data: temperatures,
        fill: false,
        backgroundColor: "rgba(53, 162, 235, 0.7)",
        borderColor: "rgba(53, 162, 235, 1)",
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: "Max Temperature (°F)",
        data: maxTemps,
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Min Temperature (°F)",
        data: minTemps,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: (value) => value + "°F",
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "Temperature (°F)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
    },
  }

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Line data={data} options={options} />
    </div>
  )
}

export default ForecastChart
