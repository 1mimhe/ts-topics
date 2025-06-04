// TypeScript follows possible paths of execution that our programs
// can take to analyze the most specific possible type of a value at a given position.
// It looks at these special checks (called type guards) and assignments,
// and the process of refining types to more specific types than declared is called 'narrowing'.

// 'typeof' type guards
// TypeScript expects this to return a certain set of strings:
// "string"
// "number"
// "bigint"
// "boolean"
// "symbol"
// "undefined"
// "object"
// "function"
// typeof null => object
// typeof array => object

// 'typeof' type guards + Control flow analysis
function padLeft(padding: number | string, input: string): string {
  // padding: number | string
  if (typeof padding === "number") {
    return " ".repeat(padding) + input; // padding: number
  }
  return padding + input; // padding: string (Control flow analysis)
}
// TypeScript was able to analyze this code
// and see that the rest of the body is unreachable in the case where padding is a number.

// Truthiness narrowing
// 'if' first “coerce” their conditions to booleans to make sense of them.
// truthy values => coerced to true
// falsy values => coerced to false

Boolean("hello"); // type: boolean, value: true
// or
// !!"world"; // type: true, value: true

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

// Equality narrowing
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x); // x: string | number
    console.log(y); // y: string | boolean
  }
}

// The 'in' operator narrowing
// JavaScript has an operator for determining
// if an object or its prototype chain has a property with a name.
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}

// 'instanceof' narrowing
// is also a type guard.
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

// Assignments
let x = Math.random() < 0.5 ? 10 : "hello world!"; // x: string | number
x = 1; // x: number

// Using type predicates (parameterName is Type)
// a user-defined type guard.
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
/*
if (isFish(pet)) {
  pet.swim(); => without type predicate the compiler can’t automatically infer the narrowed type.
} else {
  pet.fly();
}
Notice that TypeScript not only knows that pet is a Fish in the if branch;
it also knows that in the else branch, you don’t have a Fish, so you must have a Bird.
*/

// Discriminated unions
// When every type in a union contains a common property with literal types,
// TypeScript considers that to be a discriminated union, and can narrow out the members of the union.
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;

function getArea(shape: Shape) {
  if (shape.kind === "circle") { // kind: "circle" | "square"
    return Math.PI * shape.radius ** 2; // shape: Circle
  }
}
// In this case, kind was that common property (which is what’s considered a discriminant property of Shape).

// The 'never' type
// When narrowing, you can reduce the options of a union to a point
// where you have removed all possibilities and have nothing left.
// In those cases, TypeScript will use a never type to represent a state which shouldn’t exist.
// The never type is assignable to every type;
// however, no type is assignable to never (except never itself).

// Exhaustiveness checking
function getArea2(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
// Adding a new member to the Shape union, will cause a TypeScript error. If we doesn't handle it.