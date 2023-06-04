import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DonutChartSide = ({ data }) => {
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
        type: 'doughnut',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            backgroundColor: data.colors,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'right', 
              align: 'center',
              labels: {
                boxWidth: 20,
                boxHeight: 20
              }
            }
          }
        }
      });
    }
  }, [chartContainer, data]);

  return (
    <canvas ref={chartContainer} style={{ width: '500px', height: '500px' }} />
  );
};

export default DonutChartSide;
