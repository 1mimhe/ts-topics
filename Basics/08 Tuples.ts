// Array-like structure where each element represents some property of a record.
// a arrays with fixed element orders.
// each element represents something.

const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
};

const pepsi: [string, boolean, number] = ['brown', true, 40];

// Type alias
type Drink = [string, boolean, number];

const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', false, 0];