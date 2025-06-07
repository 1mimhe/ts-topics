// type annotations => for arguments and values returned
// type inference => for the value function will return (WE DON'T USE IT)

const add = (a: number, b: number): number => {
    return a + b;
};
// TS infer return value here. But we should add annotation for return value.
// Because we will make a mistake and return an incorrect value (or forget).

function multiply(a: number, b: number): number {
    return a * b;
}

function logger(message: string): void {
    console.log(message);
    // it can return nothing or undefined and null.
}

// Function returning 'never' must not have a reachable end point.
function error(message: string): never {
    throw new Error(message);
    // we can not return here.
}

// Anonymous Functions
// Anonymous functions are a little bit different from function declarations.
// When a function appears in a place where TypeScript can determine how it’s going to be called,
// the parameters of that function are automatically given types.
// This process is called contextual typing
// because the context that the function occurred within informs what type it should have.

const names = ["Alice", "Bob", "Eve"];
// parameter s inferred to have type string
names.forEach((s) => {
  console.log(s.toUpperCase());
});

// Function Type Expressions
// The simplest way to describe a function.
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

// Call Signatures
// In JavaScript, functions can have properties in addition to being callable.
// the function type expression syntax doesn’t allow for declaring properties.
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

// Construct Signatures
// JavaScript functions can also be invoked with the 'new' operator.
// TypeScript refers to these as constructors because they usually create a new object.
interface CallOrConstruct {
  (n?: number): string;
  new (s: string): Date;
}
 
function fn(ctor: CallOrConstruct) {
  // Passing an argument of type `number` to `ctor` matches it against
  // the first definition in the `CallOrConstruct` interface.
  console.log(ctor(10));
 
  // Similarly, passing an argument of type `string` to `ctor` matches it
  // against the second definition in the `CallOrConstruct` interface.
  console.log(new ctor("10"));
}
 
fn(Date);

// Generic Functions
// It’s common to write a function where
// the types of the input relate to the type of the output,
// or where the types of two inputs are related in some way.
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// * Type Inference:
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// Constraints
// In this case, we can use a constraint to limit the kinds of types that a type parameter can accept.
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
// Without the type constraint, we wouldn’t be able to access those properties
// because the values might have been some other type without a length property.

// Guidelines for Writing Good Generic Functions
// Having too many type parameters or using constraints
// where they aren’t needed can make inference less successful, frustrating callers of your function.
// 1. When possible, use the type parameter itself rather than constraining it (Push Type Parameters Down)
// ex => <Type> ✔ <Type extends any[]> ✖
// 2. Always use as few type parameters as possible
// ex:
function filter<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}
// Func doesn’t do anything but make the function harder to read and reason about!
// 3. If a type parameter only appears in one location, strongly reconsider if you actually need it

// Optional Parameters
function f(n?: number) {}
function f2(x = 10) {}

// Function Overloads
// In TypeScript, we can specify a function
// that can be called in different ways by writing overload signatures.
// To do this, write some number of function signatures (usually two or more),
// followed by the body of the function:
function makeDate(timestamp: number): Date; // Overload signature
function makeDate(m: number, d: number, y: number): Date; // Overload signature
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
} // Implementation signature
// The implementation signature must also be compatible with the overload signatures.
// Always prefer parameters with union types instead of overloads when possible

// The signature of the implementation is not visible from the outside.
// When writing an overloaded function, you should always have two or more signatures
// above the implementation of the function.
function fn3(x: string): void;
function fn3() {} // WRONG: Because we can't call fn() 

// Other Types to Know About:
// 'void' represents the return value of functions which don’t return a value. [void !== undefined]
// 'object' refers to any value that isn’t a primitive.
// 'unknown' is similar to the any type,
// but is safer because it’s not legal to do anything with an unknown value.
// 'never' => the function throws an exception or terminates execution of the program.
// 'Function' => This is an untyped function call and
// is generally best avoided because of the unsafe any return type.
// If you need to accept an arbitrary function but don’t intend to call it,
// the type () => void is generally safer.

// Rest Parameters and Arguments
function fnc(n: number, ...m: number[]) {} // Rest Parameters
[1, 2, 3].push(...[4, 5, 6]); // Rest Arguments

// Parameter Destructuring
// Unpack objects provided as an argument
function sum({ a, b, c }: { a: number; b: number; c: number }) {}