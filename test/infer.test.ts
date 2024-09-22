import { inferType } from '../src';
import { describe, it, expect } from 'vitest';

const complexObj = {
    team: [
        {
            name: "dev-team",
            members: [
                {
                    id: 1001,
                    username: "developerA",
                    role: "admin",
                    email: "devA@example.com",
                    contributions: 250,
                },
                {
                    id: 1002,
                    username: "developerB",
                    role: "contributor",
                    email: "devB@example.com",
                    contributions: 120,
                },
            ],
        },
    ]
};

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
            profile: { name: 'Anthony', age: 35 },
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
                        age: 35,
                        name: 'Anthony',
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
        const mixedArrayObj = { data: [1, { name: 'Anthony' }, true] };
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

    it('should infer types correctly for a complex object', () => {
        const inferred = inferType(complexObj);

        expect(inferred).toEqual({
            team: [
                {
                    name: 'string',
                    members: [
                        {
                            id: 'number',
                            username: 'string',
                            role: 'string',
                            email: 'string',
                            contributions: 'number',
                        }
                    ]
                }
            ]
        });
    });

    it('should handle objects with optional properties', () => {
        const objWithOptionalProps = { id: 1, name: undefined };
        expect(inferType(objWithOptionalProps)).toEqual({
            id: 'number',
            name: 'undefined',
        });
    });

    it('should handle arrays of empty objects', () => {
        const arrayOfEmptyObjects = [{}, {}];
        expect(inferType(arrayOfEmptyObjects)).toEqual([{}]);
    });


    it('should handle an array with an empty object', () => {
        const arrayWithEmptyObject = [{ id: 1 }, {}];
        expect(inferType(arrayWithEmptyObject)).toEqual(['mixed']);
    });

    it('should handle arrays containing only null values', () => {
        const arrayOfNulls = [null, null];
        expect(inferType(arrayOfNulls)).toEqual(['null']);
    });

});