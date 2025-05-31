// Union Types (Combining types - build new types)
// A union type is a type formed from two or more other types,
// representing values that may be any one of those types.
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

// Narrowing
function printId2(id: number | string) {
// console.log(id.toUpperCase()); 
// Property 'toUpperCase' does not exist on type 'string | number'.
//   Property 'toUpperCase' does not exist on type 'number'.
// We should narrowing here.
}

// Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.
function printId3(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}

// Literal Types 
// we can refer to specific strings and numbers in type positions.
type BestName = 'stephen'; // => the type is 'stephen' not string.
// const name: BestName = 'Akbar'; // Type '"Akbar"' is not assignable to type '"stephen"'.ts(2322)

// Of course, you can combine these with non-literal types:
// And combining literals into unions:
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}