import { generateTypeScriptType } from '../src';
import { describe, it, expect } from 'vitest';


// Test for generateTypeScriptType function
describe('generateTypeScriptType', () => {
    it('should generate a TypeScript type from an object', () => {
        const obj = { id: 1, name: 'Anthony' };
        const tsType = generateTypeScriptType(obj, 'MyType');
        expect(tsType).toBe(`type MyType = {\n  id: number;\n  name: string;\n};`);
    });

    it('should generate a TypeScript type from a nested object', () => {
        const nestedObj = {
            id: 1,
            profile: { name: 'Anthony', age: 30 },
        };
        const tsType = generateTypeScriptType(nestedObj, 'ProfileType');

        // Check that the generated type contains the correct type name and fields
        expect(tsType).toMatch(/type ProfileType = {/);
        expect(tsType).toMatch(/id: number;/);
        expect(tsType).toMatch(/profile: {/);
        expect(tsType).toMatch(/name: string;/);
        expect(tsType).toMatch(/age: number;/);
    });

    it('should generate TypeScript type for arrays', () => {
        const arrayObj = { tasks: ['code', 'test'] };
        const tsType = generateTypeScriptType(arrayObj, 'TaskType');
        expect(tsType).toBe(`type TaskType = {\n  tasks: string[];\n};`);
    });

    it('should generate TypeScript type for empty objects', () => {
        const emptyObj = {};
        const tsType = generateTypeScriptType(emptyObj, 'EmptyType');
        expect(tsType).toBe(`type EmptyType = {};`);
    });

    it('should generate TypeScript type for empty arrays', () => {
        const emptyArrayObj = { items: [] };
        const tsType = generateTypeScriptType(emptyArrayObj, 'ArrayType');
        expect(tsType).toBe(`type ArrayType = {\n  items: unknown[];\n};`);
    });

    it('should generate TypeScript type with null values', () => {
        const objWithNull = { id: 1, profile: null };
        const tsType = generateTypeScriptType(objWithNull, 'NullableType');
        expect(tsType).toBe(`type NullableType = {\n  id: number;\n  profile: unknown;\n};`);
    });

    it('should generate TypeScript type for deeply nested objects', () => {
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
        const tsType = generateTypeScriptType(deepNestedObj, 'DeepType');
        expect(tsType).toMatch(/type DeepType = {/);
        expect(tsType).toMatch(/user: {/);
        expect(tsType).toMatch(/profile: {/);
        expect(tsType).toMatch(/details: {/);
        expect(tsType).toMatch(/age: number;/);
        expect(tsType).toMatch(/name: string;/);
    });

    it('should generate TypeScript type for mixed arrays with nested objects', () => {
        const mixedArrayObj = { data: [1, { name: 'John' }, true] };
        const tsType = generateTypeScriptType(mixedArrayObj, 'MixedArrayType');
        expect(tsType).toMatch(/type MixedArrayType = {/);
        expect(tsType).toMatch(/data: mixed\[\];/);
    });
});
