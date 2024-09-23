import { generateTypeScriptType } from '../src';
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
            profile: { name: 'Anthony', age: 35 },
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

        const expectedTsType = `type NullableType = {\n  id: number;\n  profile: unknown;\n};`;

        // Normalize both the expected and actual outputs by trimming unnecessary whitespace
        expect(tsType.replace(/\s+/g, ' ').trim()).toBe(expectedTsType.replace(/\s+/g, ' ').trim());
    });


    it('should generate TypeScript type for deeply nested objects', () => {
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
        const tsType = generateTypeScriptType(deepNestedObj, 'DeepType');
        expect(tsType).toMatch(/type DeepType = {/);
        expect(tsType).toMatch(/user: {/);
        expect(tsType).toMatch(/profile: {/);
        expect(tsType).toMatch(/details: {/);
        expect(tsType).toMatch(/age: number;/);
        expect(tsType).toMatch(/name: string;/);
    });

    it('should generate TypeScript type for mixed arrays with nested objects', () => {
        const mixedArrayObj = { data: [1, { name: 'Anthony' }, true] };
        const tsType = generateTypeScriptType(mixedArrayObj, 'MixedArrayType');
        expect(tsType).toMatch(/type MixedArrayType = {/);
        expect(tsType).toMatch(/data: mixed\[\];/);
    });

    it('should generate a TypeScript type from a complex object', () => {
        const tsType = generateTypeScriptType(complexObj, 'RepoType');

        // Check that the generated type contains the correct fields for the object
        expect(tsType).toMatch(/type RepoType = {/);
        expect(tsType).toMatch(/team: {/);
        expect(tsType).toMatch(/name: string;/);
        expect(tsType).toMatch(/members: {/);
        expect(tsType).toMatch(/id: number;/);
        expect(tsType).toMatch(/username: string;/);
        expect(tsType).toMatch(/role: string;/);
        expect(tsType).toMatch(/email: string;/);
        expect(tsType).toMatch(/contributions: number;/);
    });

    it('should handle objects with optional properties', () => {
        const objWithOptional = { id: 1, name: undefined };
        const tsType = generateTypeScriptType(objWithOptional, 'OptionalType');
        expect(tsType).toBe(`type OptionalType = {\n  id: number;\n  name: undefined;\n};`);
    });

    it('should generate TypeScript type for arrays containing null values', () => {
        const arrayWithNulls = { items: [null, null] };
        const tsType = generateTypeScriptType(arrayWithNulls, 'NullArrayType');
        expect(tsType).toBe(`type NullArrayType = {\n  items: unknown[];\n};`);
    });

    it('should generate TypeScript type for multiple levels of nested empty arrays', () => {
        const nestedEmptyArrayObj = { data: [[[]]] };
        const tsType = generateTypeScriptType(nestedEmptyArrayObj, 'NestedArrayType');
        expect(tsType).toBe(`type NestedArrayType = {\n  data: unknown[][][];\n};`);
    });

    it('should generate TypeScript type for arrays of empty objects', () => {
        const arrayOfEmptyObjects = { items: [{}, {}] };
        const tsType = generateTypeScriptType(arrayOfEmptyObjects, 'EmptyObjectArrayType');
        expect(tsType).toBe(`type EmptyObjectArrayType = {\n  items: {}[];\n};`);
    });

    it('should generate TypeScript type for arrays of objects', () => {
        const arrayOfObjects = { users: [{ id: 1, name: 'Anthony' }, { id: 2, name: 'Jane' }] };
        const tsType = generateTypeScriptType(arrayOfObjects, 'UserArrayType');
        expect(tsType).toBe(`type UserArrayType = {\n  users: {\n    id: number;\n    name: string;\n  }[];\n};`);
    });

    it('should generate TypeScript type for Date objects', () => {
        const objWithDate = { createdAt: new Date() };
        const tsType = generateTypeScriptType(objWithDate, 'DateType');
        expect(tsType).toBe(`type DateType = {\n  createdAt: Date;\n};`);
    });
});