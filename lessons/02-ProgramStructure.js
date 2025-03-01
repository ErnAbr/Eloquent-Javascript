// #1 Looping a Triangle //

//my solution
let result1 = "";
for (let i = 0; i < 7; i++) {
  console.log((result1 = result1 + "#"));
}
//book solution
for (let line = "#"; line.length < 8; line += "#") {
  console.log(line);
}

// #2 FizzBuzz //

//my solution
for (let i = 0; i < 100; i++) {
  let result = i;
  if (i % 3 === 0) result = "Fizz";
  if (i % 5 === 0) result = "Buzz";
  if (i % 3 === 0 && i % 5 === 0) result = "FizzBuzz";
  console.log(result);
}
//book solution
for (let n = 1; n <= 100; n++) {
  let output = "";
  if (n % 3 == 0) output += "Fizz";
  if (n % 5 == 0) output += "Buzz";
  console.log(output || n);
}

// #3 Chessboard //

//my solution
let line = "";
const size = 8;
for (let i = 1; i <= size; i++) {
  for (let n = 1; n <= size; n++) {
    if ((i + n) % 2 !== 0) line += "#";
    else line += " ";
  }
  line += "\n";
}
console.log(line);
