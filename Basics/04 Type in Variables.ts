// type annotation:
// if we assign a bad value in right hand side
// hat doesn't agree with the type in lef hand side, we got an error.

// left side = right side => variable declaration + type annotation = variable initialization

// type inference => If variable declaration and initialization are on the same line,
// we don't have to annotate the type. Typescript will figure out the type of value assigned to the variable for us.

// primitive types
let speed: string = 'fast';
let nothingMuch: null = null;
let nothing: undefined = undefined;

let now: Date = new Date();
let colors: string[] = ['red', 'green', 'blue']; // array

// class
class Person {}
let person: Person = new Person();

// object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20,
};

// function
const logNumber: (i: number) => void = (i: number) => {
    console.log(i);
};

// 'any' type: When TS have no idea what type of value is it.
// can't check for correct property references. and can't catch error about that variable.
// AVOID VARIABLES WITH 'ANY' TYPE.

// When to use annotations
// 1) Function that returns the 'any' type
const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json); // It returns 'any' type.

// 2) When we declare a variable on one line
// and initialize it later
let words = ['red', 'green', 'blue'];
let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
  if (words[i] === 'green') {
    foundWord = true;
  }
}

// 3) Variable whose type cannot be inferred correctly
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}