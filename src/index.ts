import { InferredType } from './types';

/**
 * Infers the TypeScript-compatible type of a given JavaScript value.
 *
 * This function is designed to handle primitives (string, number, boolean), arrays, objects,
 * promises, and mixed types. It recursively analyzes the structure of the value to provide
 * a corresponding inferred type, handling both simple and complex structures.
 *
 * @param {any} value - The JavaScript value for which the type needs to be inferred.
 *                      This can be a primitive, object, array, or Promise.
 *
 * @returns {InferredType} - Returns the inferred type of the value:
 *    - 'string', 'number', 'boolean' for primitive values
 *    - 'unknown' for null, undefined, or unrecognized types
 *    - 'mixed' for arrays containing elements of different types
 *    - 'Promise' for Promise objects
 *    - 'unknown[]' for empty arrays
 *    - Nested objects are recursively inferred and returned as a type map
 *
 * Example:
 *
 * inferType(123)               // Returns 'number'
 * inferType([1, 'a', true])    // Returns ['mixed']
 * inferType({ id: 1, name: 'A' }) // Returns { id: 'number', name: 'string' }
 * inferType(Promise.resolve()) // Returns 'Promise'
 */
export function inferType(value: any): InferredType {
  // Handle primitive types (string, number, boolean)
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';

  // Handle arrays, including empty arrays
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return ['unknown']; // Empty arrays default to 'unknown[]'
    }

    // Infer types of array elements, check for mixed types
    const elementTypes = [...new Set(value.map(inferType))];
    return elementTypes.length === 1 ? [elementTypes[0]] : ['mixed'];
  }

  // Handle objects (but exclude null values)
  if (typeof value === 'object' && value !== null) {
    if (value instanceof Promise) {
      return 'Promise'; // Special case for Promises
    }

    // Recursively infer types for each property in the object
    const result: { [key: string]: InferredType } = {};
    for (const key in value) {
      result[key] = inferType(value[key]);
    }
    return result;
  }

  // Default to 'unknown' for unrecognized types
  return 'unknown';
}

/**
 * Generates a TypeScript type definition from an inferred structure.
 *
 * This function takes an object and generates a TypeScript type definition
 * by recursively traversing the object structure and inferring types for
 * its properties. It supports complex nested objects, arrays, and primitive types.
 *
 * @param {object} obj - The object whose structure will be inferred and used
 *                       to generate a TypeScript type definition.
 * @param {string} [typeName='GeneratedType'] - The name to assign to the
 *                                              generated TypeScript type.
 *
 * @returns {string} - A string representing the generated TypeScript type definition.
 *                     If the object is empty, an empty type (`{}`) is generated.
 *                     If the object contains nested structures or arrays, they are
 *                     recursively processed and reflected in the type definition.
 *
 * Example:
 *
 * const obj = { id: 1, name: "Anthony", tasks: ["code", "test"] };
 * generateTypeScriptType(obj, 'MyType');
 * // Returns:
 * // type MyType = {
 * //   id: number;
 * //   name: string;
 * //   tasks: string[];
 * // };
 */
export function generateTypeScriptType(
  obj: object,
  typeName: string = 'GeneratedType',
): string {
  // Infer the structure of the object (returns a recursive type map)
  const inferred = inferType(obj) as { [key: string]: InferredType };

  // Return an empty type if no properties exist in the object
  if (Object.keys(inferred).length === 0) {
    return `type ${typeName} = {};`;
  }

  // Recursive function to format inferred types, including nested objects and arrays
  const formatType = (type: InferredType, level = 1): string => {
    const indent = '  '.repeat(level); // Dynamic indentation based on nesting level

    if (Array.isArray(type)) {
      return `${formatType(type[0], level)}[]`; // Format arrays based on the type of their elements
    } else if (typeof type === 'object') {
      // Map over object properties and format each key: type pair
      const objectParts = Object.keys(type).map(
        (key) => `${indent}${key}: ${formatType(type[key], level + 1)};`,
      );
      return `{\n${objectParts.join('\n')}\n${'  '.repeat(level - 1)}}`; // Add closing brace at the correct level
    } else {
      return type as string; // Handle primitive types (string, number, etc.)
    }
  };

  // Format each top-level property and generate the final TypeScript type definition
  const typeParts = Object.keys(inferred).map(
    (key) => `  ${key}: ${formatType(inferred[key], 1)};`,
  );

  return `type ${typeName} = {\n${typeParts.join('\n')}\n};`;
}
