import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (chartInstanceRef.current) {
        // Destroy previous chart instance
        chartInstanceRef.current.destroy();
      }
      const ctx = chartContainer.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: data.title,
            data: data.values,
            backgroundColor: data.colors,
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false,
              position: 'right',
              align: 'start',
              labels: {
                boxWidth: 100,
                boxHeight: 100
              }
            }
          }
        }
      });
    }
  }, [chartContainer, data]);

  return (
    <canvas ref={chartContainer} style={{ width: 400, height: 380 }} />
  );
};

export default BarChart;