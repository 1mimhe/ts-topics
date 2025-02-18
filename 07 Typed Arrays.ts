const carMakers = ['ford', 'toyota', 'chevy']; // Type inference => string[]
const dates = [new Date(), new Date()]; // Type inference => Date[]

const carsByMake: string[][] = []; // w-dimensional array

// Help with inference when extracting values
const car = carMakers[0];

// Prevent incompatible values
carMakers.push(100); // Error occurs

// Help with 'map' and other built-in methods
carMakers.map((car: string): string => {
    return car.toUpperCase();
  }
);

// Flexible types
const importantDates: (Date | string)[] = [];
importantDates.push('2030-10-10');
importantDates.push(new Date());