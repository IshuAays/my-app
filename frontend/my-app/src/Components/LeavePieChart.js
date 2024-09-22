import React, { useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LeavePieChart({
  sickLeave = 7,
  earnedLeave = 15,
  totalSickLeave = 7,
  totalEarnedLeave = 15,
}) {
  const [hoveredData, setHoveredData] = useState(null); // Track hover details
  const chartRef = useRef(null); // Reference for the chart to access element

  const data = {
    labels: [
      'Available Sick Leave',
      'Used Sick Leave',
      'Available Earned Leave',
      'Used Earned Leave',
    ],
    datasets: [
      {
        data: [
          sickLeave,
          totalSickLeave - sickLeave,
          earnedLeave,
          totalEarnedLeave - earnedLeave,
        ],
        backgroundColor: ['#FFD700', '#e8dd7d', '#f21649', '#e85476'],
        borderColor: ['#FFD700', '#e8dd7d', '#f21649', '#e85476'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // Disable default tooltips to create custom tooltips
      },
    },
    onHover: (event, chartElement) => {
      const chartInstance = chartRef.current;
      if (chartElement.length > 0) {
        const element = chartElement[0];
        const datasetIndex = element.datasetIndex;
        const index = element.index;
        const hoveredLabel = data.labels[index];
        const hoveredValue = data.datasets[datasetIndex].data[index];
        const { x, y } = event.native; // Mouse position within the canvas

        setHoveredData({
          label: hoveredLabel,
          value: hoveredValue,
          x: x, // Mouse X position
          y: y, // Mouse Y position
        });
      } else {
        setHoveredData(null); // Clear tooltip when not hovering over a segment
      }
    },
  };

  return (
    <div className="relative max-w-md mx-auto text-center">
      <div className="relative">
        <Doughnut ref={chartRef} data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">
            {sickLeave + earnedLeave}/{totalSickLeave + totalEarnedLeave}
          </span>
        </div>
      </div>

      {/* Custom Tooltip */}
      {hoveredData && (
        <div
          className="absolute bg-black text-white p-2 rounded-md shadow-lg pointer-events-none"
          style={{
            top: hoveredData.y - 50, // Adjust positioning as needed
            left: hoveredData.x + 20,
          }}
        >
          <div className="font-semibold">{hoveredData.label}: {hoveredData.value}</div>
          {/* Tooltip Arrow */}
          <div
            className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-black"
            style={{
              top: '100%', // Place arrow below the tooltip
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          ></div>
        </div>
      )}

      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
            <span className="text-sm">Sick Leave</span>
          </div>
          <span className="text-lg font-bold bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
            {sickLeave}/{totalSickLeave}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#f21649] mr-2"></div>
            <span className="text-sm">Earned Leave</span>
          </div>
          <span className="text-lg font-bold bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
            {earnedLeave}/{totalEarnedLeave}
          </span>
        </div>
      </div>
    </div>
  );
}
