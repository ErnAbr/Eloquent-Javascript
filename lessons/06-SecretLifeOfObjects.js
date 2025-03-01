const obj = {
  name: "Name",
  age: 22,

  [Symbol.iterator]: function* () {
    yield* Object.entries(this);
  },
};

for (let [key, value] of obj) {
  console.log(`${key}: ${value}`);
}

//Static methods are often used for utility functions or methods that perform tasks related to the class itself, rather than to an instance of the class. (Instance, you need to initialize the class with new)

// A Vector Type
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }

  minus(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }

  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}

//Groups
class Group {
  constructor() {
    this.group = [];
  }

  add(value) {
    if (!this.has(value)) this.group.push(value);
  }

  delete(value) {
    if (this.has(value)) {
      this.group = this.group.filter((val) => val !== value);
    }
  }

  has(value) {
    return this.group.includes(value);
  }

  static from(array) {
    let group = new Group();
    array.forEach((val) => {
      group.add(val);
    });
    return group;
  }

  // [Symbol.iterator]() {
  //   return new GroupIterator(this.group);
  // }
}

// let group = Group.from([10, 20]);
// console.log(group);

//Iterable Groups
class GroupIterator {
  constructor(group) {
    this.group = group;
    this.progress = 0;
  }

  next() {
    if (this.group.length == this.progress) return { done: true };
    let value = this.group[this.progress];
    this.progress++;
    return { value, done: false };
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this.group);
};

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}

//Borrowing a Method
let map = { one: true, two: true, hasOwnProperty: true };

console.log(Object.prototype.hasOwnProperty.call(map, "hasOwnProperty"));
