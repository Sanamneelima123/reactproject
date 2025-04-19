import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Userchart = ({ data }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if (data.length > 0) {
            // Extract email domains and count their occurrences
            const emailDomains = data.map(user => user.email.split('@')[1]);
            const domainCounts = emailDomains.reduce((acc, domain) => {
                acc[domain] = (acc[domain] || 0) + 1;
                return acc;
            }, {});

            // Prepare data for the chart
            const labels = Object.keys(domainCounts);
            const values = Object.values(domainCounts);

            // Generate colors dynamically
            const colors = labels.map((_, index) => {
                const hue = (index * 360) / labels.length;
                return {
                    backgroundColor: `hsla(${hue}, 70%, 70%, 0.2)`,
                    borderColor: `hsla(${hue}, 70%, 70%, 1)`,
                };
            });

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Number of Users by Email Domain',
                        data: values,
                        backgroundColor: colors.map(color => color.backgroundColor),
                        borderColor: colors.map(color => color.borderColor),
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [data]);

    return (
        <div className='col-9 text-center'>
            {chartData.labels && chartData.datasets ? (
                <Doughnut
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Number of Users by Email Domain' },
                        },
                    }}
                />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default Userchart;
