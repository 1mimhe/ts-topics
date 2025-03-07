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