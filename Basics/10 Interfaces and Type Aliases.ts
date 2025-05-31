// Creates a new type, describing the property names and value types of an object.

interface Reportable {
  summary(): string; // we implement this in an object or a class.
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  }
};

const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`;
  }
};

// Reportable is a gatekeeper to 'summary()' and ...
// type checking focuses on the shape that values have => “duck typing” or “structural typing
// The oldCivic and drink variable is never declared to be a Point type.
// However, TypeScript compares the shape of those objects to the shape of Reportable in the type-check.
// They have the same shape, so the code passes.
const printSummary = (item: Reportable): void => {
  console.log(item.summary());
};

printSummary(oldCivic);
// printSummary(drink); // =>   Property 'summary' is missing in type '...' but required in type 'Reportable'.ts(2345)

// Type Aliases
// A type alias is a name for any type to use the same type more than once and refer to it by a single name.
type id = number | string;
// Note that aliases are only aliases
// you cannot use type aliases to create different/distinct “versions” of the same type.

// Differences Between Type Aliases and Interfaces
// Type aliases and interfaces are very similar,
// and in many cases you can choose between them freely.
// Almost all features of an interface are available in type
// the key distinction is that a type cannot be re-opened to add new properties
// vs an interface which is always extendable.

// Extending an interface
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

// Extending a type via intersections.
type Animal_ = {
  name: string;
}

type Bear_ = Animal_ & { 
  honey: boolean;
}