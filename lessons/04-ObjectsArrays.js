// #1 The sum of a Range
const range = (start, end, step = start < end ? 1 : -1) => {
  let rangeArray = [];

  if (start > end) {
    for (let i = start; i >= end; i += step) {
      rangeArray.push(i);
    }
  }

  if (start < end) {
    for (let i = start; i <= end; i += step) {
      rangeArray.push(i);
    }
  }

  return rangeArray;
};

const sum = (array) => {
  let sum = 0;
  array.forEach((element) => {
    sum += element;
  });

  return sum;
};

// #2 Reversing an Array

const reverseArray = (arr) => {
  let newArray = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
};

const reverseArrayInPlace = (arr) => {
  for (let i = 0; i <= arr.length / 2; i++) {
    let old = arr[i]; // "A"
    arr[i] = arr[arr.length - 1] - i;
    arr[arr.length - 1 - i] = old;
  }
  return arr;
};

// #3 A List

let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null,
    },
  },
};

const arrayToList = (arr) => {
  let list = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    list = { value: arr[i], rest: list };
  }
  return list;
};

const listResult = arrayToList([1, 2, 3]);

const listToArray = (list) => {
  let arrResult = [];
  for (let node = list; node; node = node.rest) {
    arrResult.push(node.value);
  }
  return arrResult;
};

const prepend = (element, list) => {
  const newValue = listToArray(element);
  const newList = listToArray(list);
  const result = newValue.concat(newList);

  return arrayToList(result);
};

const nthList = prepend({ value: 0 }, listResult);

const nth = (list, number) => {
  if (number == 0) return list.value;
  else if (!list) return;
  return nth(list.rest, number - 1);
};

nth(nthList, 5);

// #4 Deep Comparison

const obj1 = { value1: "Test", value2: [1, 2, 3] };
// const obj1 = 5;
const obj2 = { value1: "Test", value2: [1, 2, 3, 4] };
// const obj2 = 5;

const deepEqual = (obj1, obj2) => {
  if (
    (typeof obj1 == "object" && obj1 != null) ||
    (typeof obj2 == "object" && obj2 != null)
  ) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length != keys2.length) return false;

    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  } else {
    return obj1 === obj2;
  }
};

console.log(deepEqual(obj1, obj2));
