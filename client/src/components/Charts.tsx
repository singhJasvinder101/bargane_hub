"use client"

import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

interface ChartProps {
  priceHistory: { price: string }[];
  priceSymbol?: string;
  currentPrice?: number;
}

const Charts: FC<ChartProps> = ({ priceHistory, priceSymbol, currentPrice }) => {
  const prices = priceHistory.map(entry => entry.price);
  console.log(currentPrice)

  const data = {
    labels: priceHistory.map((_, index) => `Update ${index + 1}`),
    datasets: [
      {
        label: 'Price Updates',
        backgroundColor: 'rgba(132, 73, 160, 0.6)',
        borderColor: 'rgba(132, 73, 160, 1)',
        borderWidth: 2,
        data: priceHistory.length > 0 ? prices : [currentPrice],
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: { display: true, text: 'Product Updates', color: '#8449a0', font: { size: 16 } },
        grid: { display: false }, // Hide x-axis grid
      },
      y: {
        title: { display: true, text: `Price ${priceSymbol}`, color: '#8449a0', font: { size: 16 } },
        beginAtZero: true,
        grid: { color: 'rgba(132, 73, 160, 0.1)' }, // Adjust grid color
      },
    },
    plugins: {
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false, // Enable responsiveness
  };

  return (
    <div className='md:w-[40%]' style={{ maxWidth: '800px', maxHeight: '320px', margin: 'auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', color: '#8449a0', marginBottom: '5px' }}></div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Charts;
