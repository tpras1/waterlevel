import { writeData, readData } from "./firebase.js";

// Initialize chart
const ctx = document.getElementById("myChart").getContext("2d");
const chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [], // Timestamps
        datasets: [
            {
                label: "Temprature (C)",
                data: [],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)"
            },
            {
                label: "Humadity (A)",
                data: [],
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)"
            }
        ]
    },
    options: { responsive: true }
});

// Write random data to Firebase
setInterval(() => {
    const voltage = (30 + Math.random() *20).toFixed(1);
    const current = (10 + Math.random() * 10).toFixed(1);
    const stamp = new Date().toLocaleString('sv-SE');
    const timestamp = stamp.slice(11, 20);
    writeData({ voltage, current, timestamp });
}, 2000);

// Read data from Firebase and update the chart
readData((data) => {
    if (data) {
        // Update chart labels (timestamps) and datasets
        chart.data.labels.push(data.timestamp);
        chart.data.datasets[0].data.push(data.voltage);
        chart.data.datasets[1].data.push(data.current);

        // Keep only the last 10 entries
        if (chart.data.labels.length > 10) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
            chart.data.datasets[1].data.shift();
        }

        // Update the chart
        chart.update();
    }
});


                