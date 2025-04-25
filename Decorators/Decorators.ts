// Decorators in TypeScript are a special kind of declaration
// that can be attached to a class declaration, method, accessor, property, or parameter.
// That can be used to modify/change/anything different properties/methods in the class.
// They use the form @function, the function that will be called at runtime
// with information about the decorated declaration.

/*
{
  "compilerOptions": {
    "target": "ES6",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
*/

// Decorator Factories
function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target: any) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}

// Decorator Composition => @f @g x (Or on multiple lines) => fog in mathematics
// When multiple decorators are applied to a single declaration, there are two distinct phases:
// Phase 1: Evaluation (Top-to-Bottom):
// In this phase, the decorator expressions (or factory functions) are evaluated in the order they appear in the code,
// from top to bottom.
// Phase 2: Execution (Bottom-to-Top)
// After all decorators are evaluated, the results are then called as functions in reverse order,
// from bottom to top.

function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}

// Class Decorators 
// [These definitions here are also for methods, accessors, properties]
// The class decorator is applied to the constructor of the class and
// can be used to observe, modify, or replace a class definition.
// A class decorator cannot be used in a declaration file, or in any other ambient context (such as on a declare class).

function sealed(target: Function) {
  Object.seal(target); // target => constructor
  Object.seal(target.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
}

// Method Decorators
// Accessor and parameter decorator function's arguments are like this.
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // target:
    // Either the constructor function of the class for a static member,
    // or the prototype (include methods and accessors) of the class for an instance member.
    // propertyKey: The name of the member.
    // descriptor: The Property Descriptor for the member.
    // If the method decorator returns a value, it will be used as the Property Descriptor for the method.

    descriptor.enumerable = value;
  };
}

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
 
  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}

// Property Decorators
function propertyDecorator(target: any, propertyKey: string) {}