// Blueprint to create an object with some fields (values) and methods (functions) to represent a 'thing'.
// Modifiers:
// public: This method/field can be called any where, any time.
// private: This method/field can only be called by other methods in this class.
// protected: This method/field can be called by other methods in this class, or by other methods in child classes.

class Vehicle {
  constructor(public color: string) {}
  /*
    same as:

    public color;
    constructor(color: string) {
        this.color = color;
    }
  */

  public pio(): void {
    this.bang();
  }

  protected honk(): void {
    console.log('beep');
  }

  private bang(): void {
    console.log('bang');
  }
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);
vehicle.pio();

class Car extends Vehicle {
  // we override constructor here. but we must ensure that super() is called.
  constructor(private wheels: number, color: string, private brand: string, private model: string) {
    super(color);
  }

  private drive(): void {
    console.log('vroom');
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
    console.log(this.wheels);
  }

  // Accessors
  get fullName() {
    return `${this.brand} - ${this.model}`;
  }

  // We can also return a method with accessors.
  /*
  get on() {
    return ... => when this method changes. We don't need to change every methods we use this in it.
  }
  we call it like this => car.on(we see the original method's parameters)
  */
}

const newCar = new Car(4, 'red', 'BMW', 'X1 SUV');
newCar.startDrivingProcess();
// console.log(car.wheels); => error

console.log(newCar.fullName); // 'BMW - X1 SUV'

// export class Car {} => import { Car } from './Car';
// export default Car {} => import Car from './Car';