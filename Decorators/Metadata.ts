import 'reflect-metadata';

const plane = {
  color: 'red'
};

Reflect.defineMetadata('note', 'hi there', plane);
// defineMetadata => we define a invisible property that attached to the object.
// metadataKey: any, metadataValue: any, target: Object, propertyKey?: string

const note = Reflect.getMetadata('note', plane);
console.log(plane, note);
// { color: 'red' } hi there

// We can also defineMetadata for a property:
Reflect.defineMetadata('note', 'hello my friend', plane, 'color');

// Practical Metadata
@printMetadata
class Plane {
  color: string = "red";

  @markFunction("HI THERE")
  fly(): void {
    console.log("Vrrrrrrr");
  }
}

function markFunction(secretInfo: string) {
  return function (target: Plane, key: string) {
    Reflect.defineMetadata("secret", secretInfo, target, key);
  };
}

function printMetadata(target: typeof Plane) {
  for (let key in target.prototype) {
    const secret = Reflect.getMetadata("secret", target.prototype, key);
    console.log(secret);
  }
}
