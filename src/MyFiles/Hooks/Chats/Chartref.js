import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import axios from 'axios'; // Import axios for making HTTP requests

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const Chartref = () => {
    const [chartData, setChartData] = useState(null); // State to hold chart data

    useEffect(() => {
        // Function to fetch data from API
        const fetchData = async () => {
            try {
                // Fetch data from API
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');

                // Extract name and phone number from each user object
                const data = response.data.map(user => ({
                    label: user.name, // Name as label
                    data: [{
                        x: user.name.length, // Use name length as x-coordinate
                        y: user.phone.length, // Use phone number length as y-coordinate
                        r: 10 // Fixed radius for bubbles
                    }],
                    backgroundColor: '#0070ad' // Background color for bubbles
                }));

                // Update component state with fetched data
                setChartData({ datasets: data });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call fetchData function when component mounts
        fetchData();
    }, []);

    return (
        <div>
            <h3>Bubble Chart Component</h3>
            {chartData && <Bubble data={chartData} />}
        </div>
    );
};

export default Chartref;
