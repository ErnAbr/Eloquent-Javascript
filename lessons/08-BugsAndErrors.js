// #1 Retry

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (e) {
    console.log("error", e);
    return reliableMultiply(a, b);
  }
}

// console.log(reliableMultiply(8, 8));

// #2 The Locked Box
const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  },
};

function withBoxUnlocked(body) {
  let boxFlag = false;

  !box.locked ? (boxFlag = true) : (boxFlag = false);

  box.unlock();

  try {
    return body();
  } finally {
    boxFlag ? box.unlock() : box.lock();
  }
}

withBoxUnlocked(function () {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function () {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (error) {
  console.log("Error Raised", error);
}

console.log(box._content);

console.log(box.locked);
