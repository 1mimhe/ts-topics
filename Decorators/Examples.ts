// Method Decorator - Executes code before and after method call.
function LogExecution(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // Store the original method
  const originalMethod = descriptor.value;

  // Replace the original method with our enhanced version
  descriptor.value = function(...args: any[]) {
    // Before method execution
    console.log(`[${new Date().toISOString()}] Executing ${propertyKey}`);
    console.log(`Parameters:`, args);
    
    // Measure execution time
    const start = performance.now();
    
    try {
      // Call the original method and get its result
      const result = originalMethod.apply(this, args);
      
      // After successful method execution
      const executionTime = performance.now() - start;
      console.log(`[${propertyKey}] Execution completed successfully in ${executionTime.toFixed(2)}ms`);
      console.log(`Result:`, result);
      
      return result;
    } catch (error) {
      // After method execution with error
      const executionTime = performance.now() - start;
      console.error(`[${propertyKey}] Failed after ${executionTime.toFixed(2)}ms with error:`, error);
      throw error;
    }
  };

  return descriptor;
}

// Parameter Decorator - Validates parameters before method execution
function ValidateParams(validationFn: (...args: any[]) => boolean, errorMessage: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      // Validate parameters before method execution
      if (!validationFn(...args)) {
        throw new Error(`Validation failed for ${propertyKey}: ${errorMessage}`);
      }
      
      // If validation passes, proceed with original method
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

// Parameter Transformer Decorator - Modifies parameters before method execution
function TransformParams(transformFn: (...args: any[]) => any[]) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      // Transform parameters before method execution
      const transformedArgs = transformFn.apply(this, args);
      
      // Call original method with transformed parameters
      return originalMethod.apply(this, transformedArgs);
    };

    return descriptor;
  };
}

// Example usage
class UserService {
  @LogExecution
  @ValidateParams(((id: string) => Boolean(id && id.length > 0)), "User ID must not be empty")
  async getUserById(id: string) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    return { id, name: `User ${id}`, email: `user${id}@example.com` };
  }

  @LogExecution
  @TransformParams((...args) => {
    // Convert all strings to lowercase
    return args.map(arg => typeof arg === 'string' ? arg.toLowerCase() : arg);
  })
  async searchUsers(query: string) {
    // Simulate API call with transformed parameters
    await new Promise(resolve => setTimeout(resolve, 300));
    return [{ id: '1', name: `Result for ${query}`, match: 0.95 }];
  }
}