//your JS code here. If required.
// Function to create a Promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(name) {
  const randomTime = Math.floor(Math.random() * 3000) + 1000; // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name, time: randomTime / 1000 }); // Resolving with the promise name and time in seconds
    }, randomTime);
  });
}

// Create an array of three promises
const promises = [
  createRandomPromise("Promise 1"),
  createRandomPromise("Promise 2"),
  createRandomPromise("Promise 3")
];

// Add a row with "Loading..." initially
document.getElementById('output').innerHTML = '<tr><td colspan="2">Loading...</td></tr>';

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove the "Loading..." row
    document.getElementById('output').innerHTML = '';

    // Populate the table with the resolved values
    results.forEach((result) => {
      const newRow = `<tr><td>${result.name}</td><td>${result.time}</td></tr>`;
      document.getElementById('output').innerHTML += newRow;
    });

    // Calculate and add the total time row
    const totalTime = results.reduce((acc, result) => acc + result.time, 0);
    const totalRow = `<tr><td>Total</td><td>${totalTime.toFixed(3)}</td></tr>`;
    document.getElementById('output').innerHTML += totalRow;
  })
  .catch((error) => {
    console.error(error);
    document.getElementById('output').innerHTML = '<tr><td colspan="2">An error occurred.</td></tr>';
  });
