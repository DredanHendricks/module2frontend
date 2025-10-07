<template>
  <div class="bar-chart-wrapper">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

export default {
  name: 'PerformanceBarChart',
  components: { Bar },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      const colors = [
        '#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0',
        '#e91e63', '#00bcd4', '#8bc34a', '#ffc107', '#795548'
      ]
      return {
        labels: this.data.map(d => d.label),
        datasets: [
          {
            label: 'Performance',
            data: this.data.map(d => d.value * 10), // Convert to percentage
            backgroundColor: this.data.map((_, i) => colors[i % colors.length]),
            borderRadius: 6,
            barThickness: 30,
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 20
        },
        scales: {
          x: {
            ticks: {
              color: '#333',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            max: 100, // Set Y-axis max to 100%
            ticks: {
              callback: (value) => value + '%',
              color: '#333',
              font: {
                size: 13
              }
            },
            grid: {
              color: '#e0e0e0'
            }
          }
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Employee Performance Overview',
            color: '#222',
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: {
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed.y || 0;
                return `${label}: ${value}%`;
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.bar-chart-wrapper {
  max-width: 800px;
  height: 420px;
  margin: 40px auto;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

canvas {
  max-width: 100% !important;
  height: 100% !important;
}
</style>
