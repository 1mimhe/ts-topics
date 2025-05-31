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
