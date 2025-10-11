// let cartoonCryin = /boo+(hoo+)+/i;
// console.log(cartoonCryin.test("Boohoooo"));

// let pattern = /y/g;
// pattern.lastIndex = 3;
// let match = pattern.exec("xyzzy");
// console.log(match.index);
// console.log(pattern.lastIndex);

// #1 Regexp Golf

const first = /ca[rt]/;
console.log(first.test("my car"));
const second = /pr?op/;
console.log(second.test("lets prop"));
const third = /fer[a-z]/;
console.log(third.test("brand new ferrary"));
const fourth = /[a-z]ious/;
console.log(fourth.test("ruinous"));
const fifth = /\s[.,:;]/;
console.log(fifth.test("bad punctuation"));
const sixth = /.{6}/;
console.log(sixth.test("Siebentausenddreihundertzweiundzwanzig"));
const seventh = /\b[^eE\s]+\b/g;
console.log(seventh.test("wobbling nest"));
