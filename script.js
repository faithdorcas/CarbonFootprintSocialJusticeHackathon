// Array to hold carbon footprint data for 4 weeks
const carbonData = [0, 0, 0, 0]; 
const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

const ctx = document.getElementById('carbonChart').getContext('2d');
const carbonChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Carbon Footprint (kg CO2)',
            data: carbonData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

document.getElementById('footprintForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user inputs
    const weekSelected = document.getElementById('weekSelect').value;
    const milesDriven = parseFloat(document.getElementById('milesDriven').value);
    const electricityUsed = parseFloat(document.getElementById('electricityUsed').value);
    const wasteProduced = parseFloat(document.getElementById('wasteProduced').value);

    // Carbon footprint calculations (for weekly data)
    const carbonFromDriving = milesDriven * 0.404;
    const carbonFromElectricity = electricityUsed * 0.233;
    const carbonFromWaste = wasteProduced * 0.907;

    const totalCarbonFootprint = carbonFromDriving + carbonFromElectricity + carbonFromWaste;

    // Display the result
    document.getElementById('result').innerHTML = `Your estimated carbon footprint for ${weekSelected} is ${totalCarbonFootprint.toFixed(2)} kg CO2.`;

    // Update the corresponding week data
    const weekIndex = parseInt(weekSelected.split(' ')[1]) - 1;
    carbonData[weekIndex] += totalCarbonFootprint;

    // Update chart
    carbonChart.update();
});