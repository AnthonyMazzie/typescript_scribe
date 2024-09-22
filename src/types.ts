/**
 * Represents the inferred type of a value, supporting primitive types (string, number, boolean),
 * mixed types (e.g., arrays of mixed elements), promises, and nested objects or arrays.
 */
export type InferredType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'unknown'
  | 'mixed'
  | 'Promise'
  | 'undefined'
  | 'null'
  | { [key: string]: InferredType }
  | InferredType[];
