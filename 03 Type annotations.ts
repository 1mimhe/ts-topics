// if we assign a bad value in right hand side
// hat doesn't agree with the type in lef hand side, we got an error.
// type: what variable refer to. Each value has a type.
// left side: variable declaration + type annotation = variable initialization
// type inference => If variable declaration and initialization are on the same line,
// we don't have to annotate the type. Typescript will figure out the type of value assigned to the variable for us.
//

// primitive types
let speed: string = 'fast';
let nothingMuch: null = null;
let nothing: undefined = undefined;

let now: Date = new Date();
let colors: string[] = ['red', 'green', 'blue']; // array

// class
class Car {}
let car: Car = new Car();

// object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20,
};

// function
const logNumber: (i: number) => void = (i: number) => {
    console.log(i);
};