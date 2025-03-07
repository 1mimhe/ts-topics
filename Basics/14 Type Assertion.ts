// Sometimes you will have information about the type of a value that TypeScript can’t know about (any).
// In this situation, you can use a type assertion to specify a more specific type.
// Like a type annotation, type assertions are removed by the compiler and won’t affect the runtime behavior of your code.

// We can do assertions in 2 forms:
const myCanvas = <HTMLCanvasElement> document.getElementById("main_canvas");
const myCanvas2 = document.getElementById("main_canvas") as HTMLCanvasElement;

// TypeScript only allows type assertions which convert to a more specific or less specific version of a type (like casting). 