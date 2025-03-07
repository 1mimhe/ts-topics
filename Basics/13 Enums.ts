// Enums allow a developer to define a set of named constants (closely related values).
// Using enums can make it easier to document intent, or create a set of distinct cases.
// is not a type-level extension of JavaScript.
// It follows near-identical syntax rules as normal objects.
// Not changes over time.

// Numeric enums
enum Direction {
  Up = 1,
  Down, // 2 => auto-incremented
  Left, // 3
  Right // 4
}
// If we wanted, we could leave off the initializers entirely. The values will be => 0, 1, 2, 3, ...
// This auto-incrementing behavior is useful for cases where we might not care about the member values themselves,
// but do care that each value is distinct from other values in the same enum.

// All Enum member must have initializer.

// we can declare types using the name of the enum.
function direction(message: Direction): void {
  // ...
}
direction(Direction.Down);

// Heterogeneous enums
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
} 
// it’s advised that you don’t do this.

enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member => just can be numbers
  G = "123".length,
  DATE = Date.now()
}

console.log(FileAccess.DATE); // 1741281641525
setTimeout(() => console.log(FileAccess.DATE), 3000); // 1741281641525