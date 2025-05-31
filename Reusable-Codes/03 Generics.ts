// we can create reusable components with generics.
// A generic type is a type variable, a special kind of variable that works on types rather than values.

// Generic function
function echo<Type>(arg: Type): Type {
  return arg;
}

let output = echo("myString"); // let output: string
// Here we use type argument inference.
// or we can use => let output = identity<string>("myString");

// Generic classes
// Generic classes have a generic type parameter list in angle brackets (<>) following the name of the class.
// Just as with interface, putting the type parameter on the class itself
// lets us make sure all of the properties of the class are working with the same type.

import fs from 'fs';

interface Reader<T> {
  read(): void;
  data: T[];
}

abstract class CsvFileReader<T> implements Reader<T> {
  data: T[] = [];

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): T;

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: 'utf-8',
      })
      .split('\n')
      .map((row: string): string[] => {
        return row.split(',');
      })
      .map(this.mapRow);
  }
}

enum MatchResult {
  HomeWin = 'H',
  AwayWin = 'A',
  Draw = 'D',
}

type MatchData = [Date, string, string, number, number, MatchResult, string];

export class MatchReader extends CsvFileReader<MatchData> {
  mapRow(row: string[]): MatchData {
    return [
      dateStringToDate(row[0]),
      row[1],
      row[2],
      parseInt(row[3]),
      parseInt(row[4]),
      row[5] as MatchResult,
      row[6],
    ];
  }
}

const dateStringToDate = (dateString: string): Date => {
  const dateParts = dateString.split('/').map((value: string): number => {
    return parseInt(value);
  });

  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};


// Generic Constraints
// you may sometimes want to write a generic function
// that works on a set of types where you have some knowledge about
// what capabilities that set of types will have
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

// You can declare a type parameter that is constrained by another type parameter.
class Attributes<T> {
  constructor(private data: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set(update: T): void {
    this.data = update;
  }
}

let x = new Attributes({ name: 'John', age: 23, gender: true });
const age = x.get('age');
// key type => 'name' | 'age' | 'gender' => **
// age type => number (not any or string | number | boolean)

// x.get('phoneNumber'); => Got an error.