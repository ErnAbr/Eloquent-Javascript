// #1 Flattening

let arrays = [[1, 2, 3], [4, 5], [6]];
const values = arrays.reduce((acc, cur) => acc.concat(cur), []);

// #2 Your Own Loop

const loop = (value, testFunction, updateFunction, bodyFunction) => {
  while (testFunction(value)) {
    bodyFunction(value);
    value = updateFunction(value);
  }
};

// loop(
//   3,
//   (n) => n > 0,
//   (n) => n - 1,
//   console.log
// );

// #3 Everything

function every(array, test) {
  let result = true;
  for (let i = 0; i < array.length; i++) {
    if (!test(array[i])) result = false;
  }
  return result;
}

// a && b == !(!a || !b)
function everyWithSome(array, test) {
  return !array.some((el) => !test(el));
}

// #4 Dominant Writing Direction

import { SCRIPTS } from "./scripts.js";

function dominantDirection(text) {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  })
    .filter(({ name }) => name !== "none")
    .reduce((a, b) => {
      return a.count < b.count ? b : a;
    });

  let result = SCRIPTS.filter((script) => script.name == scripts.name);

  return result[0].direction;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
}

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

console.log(dominantDirection("Hey, مساء الخير"));
console.log(dominantDirection("las"));
