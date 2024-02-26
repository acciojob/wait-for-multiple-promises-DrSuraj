// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise() {
    const randomTime = Math.floor(Math.random() * 3) + 1; // Random time between 1 and 3 seconds
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(randomTime);
        }, randomTime * 1000);
    });
}

// Array to store the promises
const promises = [];

// Create 3 promises
for (let i = 0; i < 3; i++) {
    promises.push(createRandomPromise());
}

// Add a row with Loading... to the table initially
const table = document.getElementById('myTable');
const loadingRow = table.insertRow();
const loadingCell = loadingRow.insertCell();
loadingCell.colSpan = 2;
loadingCell.textContent = 'Loading...';

// Wait for all promises to resolve
Promise.all(promises)
    .then(results => {
        // Remove the loading row
        table.deleteRow(loadingRow.rowIndex);

        // Populate the table with the resolved values
        results.forEach((time, index) => {
            const row = table.insertRow();
            const promiseCell = row.insertCell();
            const timeCell = row.insertCell();
            promiseCell.textContent = `Promise ${index + 1}`;
            timeCell.textContent = `${time} seconds`;
        });

        // Calculate the total time taken to resolve all promises
        const totalTime = results.reduce((acc, curr) => acc + curr, 0);
        const totalRow = table.insertRow();
        const totalCellLabel = totalRow.insertCell();
        const totalCellTime = totalRow.insertCell();
        totalCellLabel.textContent = 'Total';
        totalCellTime.textContent = `${totalTime.toFixed(3)} seconds`;
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });
