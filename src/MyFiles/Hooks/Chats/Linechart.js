import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Linechart = () => {
  const [posts, setPosts] = useState([]); // State to store posts data

  // Function to fetch data from the API
  const fetchData = () => {
    fetch('http://localhost:3001/Employes')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Data:', data); // Debugging step to check the fetched data
        setPosts(data); // Set fetched data to state
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId); // Cleanup the interval
    };
  }, []); // Empty dependency array to run once on component mount

  // If data is not fetched yet, show a loading state or placeholder
  if (!posts.length) {
    return <div>Loading...</div>;
  }

  // Debugging: Check the structure of the posts data
  console.log('Posts Data:', posts);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // Assuming each post has a 'month' field
  const labels = posts.map(post => post.month);
  console.log('Labels:', labels); // Debugging step to verify labels

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: posts.map(post => post.dataset1), // Assuming each post has a 'dataset1' field
        backgroundColor: '#FF1E8E',
      },
      {
        label: 'Dataset 2',
        data: posts.map(post => post.dataset2), // Assuming each post has a 'dataset2' field
        backgroundColor: '#0070ad',
      },
      {
        label: 'Dataset 3',
        data: posts.map(post => post.dataset3), // Assuming each post has a 'dataset3' field
        backgroundColor: '#12abdb',
      },
    ],
  };

  return (
    <div className='row'>
      <div className='col-1'></div>
      <div className='col-10'>
      <Bar options={options} data={data} />
      </div>
      <div className='col-1'></div>
    </div>
  );
};

export default Linechart;
