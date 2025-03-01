function power(base, exponent) {
  if (exponent === 0) return 1;
  else {
    console.log("exponent", exponent);
    return base * power(base, exponent - 1);
  }
}

console.log(power(2, 3));

// #1 Mimimum //
const minimumValue = (a, b) => {
  return a < b ? a : b;
};
console.log(minimumValue(11, -10));

// #2 Recursion //
const isEven = (number) => {
  if (number === 0) return true;
  else if (number === 1) return false;
  else if (number < 0) return isEven(-number);
  else return isEven(number - 2);
};
console.log(isEven(-1));

// #3 Bean Counting
const countBs = (string) => {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "B") count++;
  }
  return count;
};
console.log(countBs("BarBsukBas"));

const countChar = (string, char) => {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === char) count++;
  }
  return count;
};
console.log(countChar("BebBrasSS", "s"));
