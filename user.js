document.addEventListener('DOMContentLoaded', () => {
    const chartCanvas = document.getElementById('myChart');
    const chartButtons = document.querySelectorAll('.chart-btn');
    let myChart; // To store the Chart.js instance

    // Dummy Data for demonstration
    const dummyData = {
        daily: {
            labels: ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM'],
            data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 500) + 50)
        },
        weekly: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 3000) + 500)
        },
        monthly: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 15000) + 2000)
        },
        yearly: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100000) + 10000)
        }
    };

    // Function to render the chart
    function renderChart(chartType) {
        if (myChart) {
            myChart.destroy(); // Destroy existing chart instance to prevent conflicts
        }

        const data = dummyData[chartType].data;
        const labels = dummyData[chartType].labels;

        myChart = new Chart(chartCanvas, {
            type: 'line', // Can be 'bar', 'pie', 'doughnut', etc.
            data: {
                labels: labels,
                datasets: [{
                    label: `Sales Data (${chartType.charAt(0).toUpperCase() + chartType.slice(1)})`,
                    data: data,
                    backgroundColor: 'rgba(52, 219, 119, 0.2)', // Blue with transparency
                    borderColor: '#5dbc50', // Solid blue
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3 // Smooth line
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Allows chart to fill its container
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                }
            }
        });
    }

    // Event listeners for chart type buttons
    chartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            chartButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            const chartType = button.dataset.chartType;
            renderChart(chartType);
        });
    });

    // Initial chart render (e.g., Daily chart on load)
    renderChart('daily');
});