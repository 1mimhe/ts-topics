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
  constructor(private wheels: number, color: string) {
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
}

const car = new Car(4, 'red');
car.startDrivingProcess();
// console.log(car.wheels); => error