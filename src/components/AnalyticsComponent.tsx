import moment from 'moment';
import React from 'react'
import { Bar } from "react-chartjs-2";

const AnalyticsComponent = ({analytics}: {analytics: any}) => {

    const data = {
        labels: analytics?.analytics?.slots ?? ["5:00", "5:30", "6:00", "6:30"],
        datasets: [
          {
            data: analytics?.analytics?.ActiveUsers ?? [20, 50, 10, 90],
            fill: true,
            borderColor: "rgba(75,192,192,0.2)",
            backgroundColor: [
              "rgba(31, 183, 241, 1)",
            //   "rgba(41, 179, 75, 1)",
            //   "rgba(248, 185, 20, 1)",
            //   "rgba(245, 126, 32, 1)",
              // "rgba(237, 28, 36, 1)",
            ],
          },
        ],
      };
  return (
    <Bar data={data}/>
  )
}

export const NewBarGraph = ({analytics}: {analytics: any}) => {
  
   const options = {
    plugins: {
      title: {
        display: true,
        text: 'Graph',
      },
    },
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // Extract dates and time slots
const labels = analytics.map((entry: any) => moment(entry?.date).format('YYYY-MM-DD'));
const timeSlots = analytics[0].analytics.slots; // Assuming all entries have the same time slots

// Initialize datasets array
const datasets = timeSlots.map((timeSlot: any, index: number) => ({
  label: timeSlot.slice(0, timeSlot.length - 3),
  data: analytics.map((entry: any) => entry.analytics.ActiveUsers[index] || null),
  backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
  stack: `Stack ${index}`,
}));

// Create the final object
const data = {
  labels,
  datasets,
};

  //  const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: '4:00',
  //       data: [2, 20, 30, 10, 60],
  //       backgroundColor: 'rgb(255, 99, 132)',
  //       stack: 'Stack 0',
  //     },
  //     {
  //       label: '5:00',
  //       data: [4, 10, 0],
  //       backgroundColor: 'rgb(75, 192, 192)',
  //       stack: 'Stack 1',
  //     },
  //     {
  //       label: '6:00',
  //       data: [9, 5, 7],
  //       backgroundColor: 'rgb(53, 162, 235)',
  //       stack: 'Stack 2',
  //     },
  //   ],
  // };

  return (
    <Bar data={data} options={options} />
  )
}

export default AnalyticsComponent