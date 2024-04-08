const THINKING = 0;
const HUNGRY = 1;
const EATING = 2;

let N = 0; // Number of philosophers
let timeGap = 0; // Time gap between actions
let eatTime = 0; // Time for eating

let state = []; // Array to keep track of everyone's state
let continueSimulation = true; // Flag to control simulation continuation

function startSimulation() {
    N = parseInt(document.getElementById("pnum").value);
    timeGap = parseInt(document.getElementById("timeGap").value);
    eatTime = parseInt(document.getElementById("eatTime").value);

    if (isNaN(N) || isNaN(timeGap) || isNaN(eatTime)) {
        document.getElementById("output").innerHTML = "Please fill all the fields with valid numbers.";
        return;
    }

    if (N < 2 || N > 10) {
        document.getElementById("output").innerHTML = "Number of philosophers must be between 2 and 10.";
        return;
    }

    state = new Array(N).fill(THINKING);
    document.getElementById("output").innerHTML = "Simulation started.";

    document.getElementById("startButton").disabled = true;
    document.getElementById("proceedButton").disabled = true;

    // Start the simulation
    philosopher(0); // Start with the first philosopher
}

function proceedSimulation() {
    continueSimulation = false; // Set the flag to false to stop the simulation
    document.getElementById("output").innerHTML = "Simulation completed.";
}


function restartSimulation() {
    location.reload(); // Reload the page
}

function philosopher(i) {
    if (!continueSimulation) return; // Check if simulation should continue

    setTimeout(() => {
        takeForks(i);
        if (state[i] !== EATING) {
            console.log("Philosopher " + i + " failed to eat, retrying...");
            philosopher((i + 1) % N); // Move to the next philosopher in a round-robin manner
        } else if (!state.some(s => s === HUNGRY)) {
            // If all philosophers have tried to eat and none are currently hungry, stop the simulation
            proceedSimulation();
        }
    }, timeGap * 1000);           //changing time from milliseconds to seconds
}


function takeForks(i) {
    console.log("Philosopher " + i + " is trying to take forks...");
    state[i] = HUNGRY;
    updateUI();

    // Simulate some time for taking forks
    setTimeout(() => {
        eat(i);
    }, timeGap * 1000); // Adjust this delay as needed
}

function eat(i) {
    console.log("Philosopher " + i + " is eating...");
    state[i] = EATING;
    updateUI();

    // Simulate eating time
    setTimeout(() => {
        console.log("Philosopher " + i + " finished eating.");
        state[i] = THINKING;
        updateUI();
    }, eatTime * 1000);
}

function updateUI() {
    // Update UI to reflect the state of philosophers
    let output = "";
    for (let i = 0; i < N; i++) {
        output += "Philosopher " + i + " is " + (state[i] === THINKING ? "thinking" : state[i] === HUNGRY ? "hungry" : "eating") + "<br>";
    }
    document.getElementById("output").innerHTML = output;
}