import { inferType } from '../src';
import { describe, it, expect } from 'vitest';

// Test for inferType function
describe('inferType', () => {
    it('should infer primitive types', () => {
        expect(inferType(123)).toBe('number');
        expect(inferType('Hello')).toBe('string');
        expect(inferType(true)).toBe('boolean');
    });

    it('should infer arrays', () => {
        expect(inferType([1, 2, 3])).toEqual(['number']);
        expect(inferType(['a', 'b', 'c'])).toEqual(['string']);
    });

    it('should infer objects', () => {
        const obj = { id: 1, name: 'Anthony' };
        expect(inferType(obj)).toEqual({ id: 'number', name: 'string' });
    });

    it('should handle nested objects', () => {
        const nestedObj = {
            id: 1,
            profile: { name: 'Anthony', age: 30 },
        };
        expect(inferType(nestedObj)).toEqual({
            id: 'number',
            profile: { name: 'string', age: 'number' },
        });
    });

    it('should handle mixed arrays', () => {
        const mixedArray = [1, 'a', true];
        expect(inferType(mixedArray)).toEqual(['mixed']);
    });

    it('should handle promises', () => {
        const promise = Promise.resolve(123);
        expect(inferType(promise)).toBe('Promise');
    });

    it('should handle empty objects', () => {
        expect(inferType({})).toEqual({});
    });

    it('should handle empty arrays', () => {
        expect(inferType([])).toEqual(['unknown']);
    });

    it('should handle null values', () => {
        const objWithNull = { id: 1, profile: null };
        expect(inferType(objWithNull)).toEqual({
            id: 'number',
            profile: 'null',
        });
    });

    it('should handle deeply nested objects', () => {
        const deepNestedObj = {
            user: {
                profile: {
                    details: {
                        age: 30,
                        name: 'John',
                    },
                },
            },
        };
        expect(inferType(deepNestedObj)).toEqual({
            user: {
                profile: {
                    details: {
                        age: 'number',
                        name: 'string',
                    },
                },
            },
        });
    });

    it('should handle mixed arrays with nested objects', () => {
        const mixedArrayObj = { data: [1, { name: 'John' }, true] };
        expect(inferType(mixedArrayObj)).toEqual({
            data: ['mixed'],
        });
    });

    // New tests for improvements
    it('should handle undefined values', () => {
        const objWithUndefined = { id: 1, profile: undefined };
        expect(inferType(objWithUndefined)).toEqual({
            id: 'number',
            profile: 'undefined',
        });
    });

    it('should throw an error when a function is passed', () => {
        const objWithFunction = { id: 1, getName: () => 'Anthony' };
        expect(() => inferType(objWithFunction)).toThrow('Functions are not supported for type inference.');
    });
});
