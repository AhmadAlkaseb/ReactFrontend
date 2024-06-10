// Higher-order function: Logger
function createLogger(action) {
    return function(username) {
        console.log(`${username} performed ${action}`);
    };
}

// Funktioner til forskellige handlinger
const logLogin = createLogger('login');
const logLogout = createLogger('logout');
const logPurchase = createLogger('purchase');
const testingLogin = createLogger('testingLogin');

// Brug af de returnerede funktioner
logLogin('Alice');    // Output: Alice performed login
logLogout('Bob');     // Output: Bob performed logout
logPurchase('Charlie'); // Output: Charlie performed purchase
testingLogin("Hanni");// Output: Hanni performed testingLogin



// HOF-extraCode that takes a function
// function to generate a number
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Higher-order function: id generator
function generateIdForUser(getRandomIntFunc) {
    return function(username) {
        const id = getRandomIntFunc(101+1); // Use getRandomIntFunc to generate id
        console.log(`id: ${id} has been generated for user: ${username}`);
    };
}

// Function for generating user id
const generateId = generateIdForUser(getRandomInt);

// Use the generateId function
generateId('Hanni');


// id kan ikke printes da det er et lokalt variabel
console.log(id);