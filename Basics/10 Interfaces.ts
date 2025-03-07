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
printSummary(drink);