const axios = require('axios');

const url = "http://20.244.56.144/test/auth";
const data = {
  companyName: 'goMart',
  clientID: 'f3946dc8-35b0-46de-8243-b6622f5df99e',
  clientSecret: 'FOQxQUNgRIKFsHIX',
  ownerName: 'Bhavana',
  ownerEmail: 'pentambhavan11@gmail.com',
  rollNo: '21J41A6653'
};
const express = require("express");
const axios = require("axios"); // Import axios
const app = express();
const PORT = 3001;

app.use(express.json());

// for choosing odd numbers
app.post("/numbers/odd", (req, res) => {
    const numbers = req.body.numbers;

    // Validate input
    if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
        return res
            .status(400)
            .json({ error: "Numbers array is required and must not be empty" });
    }

    // Ensure all elements in the array are numbers
    if (!numbers.every(num => typeof num === 'number')) {
        return res
            .status(400)
            .json({ error: "All elements in the numbers array must be numbers" });
    }

    // Filter out odd numbers
    const oddNumbers = numbers.filter(num => num % 2 !== 0);

    // Calculate sum and average of odd numbers
    const sum = oddNumbers.reduce((acc, num) => acc + num, 0);
    const average = oddNumbers.length > 0 ? sum / oddNumbers.length : 0;

    // Respond with filtered odd numbers and their average
    res.json({
        oddNumbers: oddNumbers,
        avg: average
    });
});

// for choosing even numbers
app.post("/numbers/even", (req, res) => {
  const numbers = req.body.numbers;

  if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
    return res
      .status(400)
      .json({ error: "Numbers array is required and must not be empty" });
  }

  const evenNumbers = numbers.filter((num) => num % 2 === 0);

  res.json({
    evenNumbers: evenNumbers,
  });
});

// for generating random numbers
function getRandomNumbersFromList(list, count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * list.length);
    randomNumbers.push(list[randomIndex]);
  }
  return randomNumbers;
}

// for generating Fibonacci sequence
function generateFibonacci(n) {
  if (n <= 0) return [];
  const fib = [0, 1];
  while (fib.length < n) {
    const nextNumber = fib[fib.length - 1] + fib[fib.length - 2];
    fib.push(nextNumber);
  }
  return fib.slice(0, n);
}

// Fibonacci endpoint
app.post("/numbers/fibonacci", (req, res) => {
  const { count } = req.body;

  if (typeof count !== "number" || count <= 0) {
    return res.status(400).json({ error: "Count must be a positive number" });
  }

  const fibonacciNumbers = generateFibonacci(count);

  res.json({
    count: count,
    fibonacciNumbers: fibonacciNumbers,
  });
});

// for generating random numbers
app.post("/numbers/rand", (req, res) => {
  const { numbers, count } = req.body;

  if (
    !Array.isArray(numbers) ||
    numbers.length === 0 ||
    typeof count !== "number" ||
    count <= 0
  ) {
    return res
      .status(400)
      .json({ error: "Valid numbers array and positive count are required" });
  }

  const randomNumbers = getRandomNumbersFromList(numbers, count);

  res.json({
    randomNumbers: randomNumbers,
  });
});

// New route for generating prime numbers
function generatePrimes(n) {
  const primes = [];
  let num = 2;
  while (primes.length < n) {
    if (isPrime(num)) {
      primes.push(num);
    }
    num++;
  }
  return primes;
}

// Helper function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// Prime numbers endpoint
app.post("/numbers/primes", (req, res) => {
  const { count } = req.body;

  if (typeof count !== "number" || count <= 0) {
    return res.status(400).json({ error: "Count must be a positive number" });
  }

  const primeNumbers = generatePrimes(count);

  res.json({
    count: count,
    primeNumbers: primeNumbers,
  });
});

// New route for making an axios request
app.post("/auth", (req, res) => {
  const url = "http://20.244.56.144/test/auth";
  const data = {
    companyName: "goMart",
    clientID: "ce6f3c02-1735-4450-9ca9-55856ecd58c5",
    clientSecret: "HxsgLjalSwMXKPoB",
    ownerName: "Mokshith",
    ownerEmail: "garipallymokshith@gmail.com",
    rollNo: "1"
  };

  axios.post(url, data)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        console.log("Request successful");
        console.log(response.data);
        res.json(response.data);
      } else {
        console.log("Request failed with status code:", response.status);
        res.status(response.status).json({ error: Request failed with status code: ${response.status} });
      }
    })
    .catch(error => {
      console.log("Error making the request:", error.message);
      res.status(500).json({ error: Error making the request: ${error.message} });
    });
});

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});