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
 *    - 'undefined' for undefined values
 *    - 'null' for null values
 *    - 'mixed' for arrays containing elements of different types
 *    - 'Promise' for Promise objects
 *    - 'unknown[]' for empty arrays
 *    - Nested objects are recursively inferred and returned as a type map
 *    - Throws an error for unsupported types like functions.
 *
 * Example:
 *
 * inferType(123)               // Returns 'number'
 * inferType([1, 'a', true])    // Returns ['mixed']
 * inferType({ id: 1, name: 'A' }) // Returns { id: 'number', name: 'string' }
 * inferType(Promise.resolve()) // Returns 'Promise'
 */
export function inferType(value: any): InferredType {
  // Handle undefined and null values
  if (value === undefined) {
    return 'undefined';
  }
  if (value === null) {
    return 'null';
  }

  // Handle primitive types (string, number, boolean)
  if (typeof value === 'string') {
    return 'string';
  }
  if (typeof value === 'number') {
    return 'number';
  }
  if (typeof value === 'boolean') {
    return 'boolean';
  }

  // Handle Date objects (specific handling)
  if (value instanceof Date) {
    return 'Date'
  }

  // Handle functions (throw an error)
  if (typeof value === 'function') {
    throw new Error('Functions are not supported for type inference.');
  }

  // Handle arrays, including empty arrays
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return ['unknown']; // Empty arrays default to 'unknown[]'
    }

    // Infer types of array elements
    const elementTypes = value.map(inferType);

    // Collect unique types and remove duplicates
    const uniqueElementTypes = [...new Set(elementTypes.map(el => JSON.stringify(el)))].map(el => JSON.parse(el));

    if (uniqueElementTypes.length > 1) {
      return ['mixed']; // Handle mixed types
    }

    return [uniqueElementTypes[0]];
  }

  // Handle objects (excluding null values)
  if (typeof value === 'object' && value !== null) {
    if (value instanceof Promise) {
      return 'Promise'; // Special case for Promises
    }

    if (Object.keys(value).length === 0) {
      return {}; // Return an empty object if the object is empty
    }

    // Recursively infer types for each property in the object
    const result: { [key: string]: InferredType } = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = inferType(value[key]);
      }
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
  const formatType = (type: InferredType, level = 1, isArrayElement = false): string => {
    const indent = '  '.repeat(level);  // Dynamic indentation based on nesting level
    const baseIndent = '  '.repeat(level - 1);  // Base indentation for array elements

    if (Array.isArray(type)) {
      // For array elements, recursively format the type and ensure correct indentation
      return `${formatType(type[0], level + 1)}[]`; // Increase level for array items
    } else if (typeof type === 'object' && type !== null) {
      // Special case for empty objects: return just "{}"
      if (Object.keys(type).length === 0) {
        return '{}';
      }

      // Format object properties and handle indentation correctly for array elements
      const objectParts = Object.keys(type).map(
        (key) => `${isArrayElement ? baseIndent + '    ' : indent}${key}: ${formatType(type[key], level + 1)};`
      );

      return `{\n${objectParts.join('\n')}\n${isArrayElement ? baseIndent : '  '.repeat(level - 1)}}`;
    } else {
      return type === 'null' ? 'unknown' : (type as string);
    }
  };


  // Format each top-level property and generate the final TypeScript type definition
  const typeParts = Object.keys(inferred).map(
    (key) => `  ${key}: ${formatType(inferred[key], 1)};`
  );

  return `type ${typeName} = {\n${typeParts.join('\n')}\n};`;
}
