# typescript_scribe

![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue.svg)
![GitHub](https://img.shields.io/github/license/AnthonyMazzie/typescript_scribe)
![npm](https://img.shields.io/npm/v/typescript_scribe)
![npm](https://img.shields.io/npm/dt/typescript_scribe)
[![codecov](https://codecov.io/gh/AnthonyMazzie/typescript_scribe/graph/badge.svg?token=Eg1Mhyy2bv)](https://codecov.io/gh/AnthonyMazzie/typescript_scribe)

<div style="display: flex; justify-content: space-evenly; align-items: center; gap: 20px;">
  <div style="text-align: center;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js Logo" width="80" height="80" />
    <p>Node.js</p>
  </div>
  <div style="text-align: center;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript Logo" width="80" height="80" />
    <p>JavaScript</p>
  </div>
  <div style="text-align: center;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript Logo" width="80" height="80" />
    <p>TypeScript</p>
  </div>
</div>

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Basic Usage](#basic-usage)
   - [Infer Type](#infer-type)
   - [Generate TypeScript Type](#generate-typescript-type)
6. [Real-World Examples](#real-world-examples)
   - [Handling a Complex API Response](#handling-a-complex-api-response)
   - [Inferring Types for Dynamic Form Data](#inferring-types-for-dynamic-form-data)
7. [Advanced Usage](#advanced-usage)
   - [Custom Type Names](#custom-type-names)
   - [Nested Object Structures](#nested-object-structures)
8. [TypeScript Types](#typescript-types)
9. [Handling Edge Cases](#handling-edge-cases)
10. [Additional Notes](#additional-notes)
11. [Known Issues and Limitations](#known-issues-and-limitations)
12. [Contributing](#contributing)
    - [Support the Project](#support-the-project)
    - [How to Contribute](#how-to-contribute)
    - [Pipeline](#pipeline)
    - [Linting with XO](#linting-with-xo)
    - [Testing with Vitest](#testing-with-vitest)
13. [License](#license)


## Introduction 
`typescript_scribe` is a lightweight library that automatically infers the structure of JavaScript objects and generates corresponding TypeScript types. It helps engineers quickly generate type definitions from dynamic data, reducing manual work and improving code quality.

## Features

- **Type Inference for Objects and Arrays**: Automatically infers types from complex and nested objects or arrays.
- **Date and Promise Handling**: Correctly infers `Date` and `Promise` objects in JavaScript.
- **Mixed Types and Empty Arrays**: Handles arrays with mixed types, returning `'mixed'` for accurate representation, and infers empty arrays as `['unknown']`.
- **Support for Nested Object Structures**: Recursively infers types for deeply nested objects and arrays with ease.
- **TypeScript-First Approach**: Generates TypeScript-compatible type definitions without the need for manual intervention.

## Prerequisites

- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed (version 16.x or above recommended).
- **npm**: Ensure npm is installed. It comes bundled with Node.js.
- **TypeScript**: You should have [TypeScript](https://www.typescriptlang.org/download/) installed and set up in your project.

## Installation

`npm install typescript_scribe` or `yarn add typescript_scribe`

## Basic Usage

### Infer Type

Use the `inferType` function to deduce the structure of your JavaScript object.

```ts
import { inferType } from 'typescript_scribe';

const myObj = {
  id: 1,
  name: "Anthony",
  time: new Date(),
  tasks: ["code", "sleep", "repeat"]
};

// Infer the structure of the object
const inferred = inferType(myObj);
console.log(inferred);

// Output:
{
  id: 'number',
  name: 'string',
  time: 'Date',
  tasks: ['string']
}
```

### Generate TypeScript Type

Use `generateTypeScriptType` to generate a TypeScript type definition based on the inferred structure.

```ts
import { generateTypeScriptType } from 'typescript_scribe';

const myObj = { id: 1, name: "Anthony", tasks: ["code", "sleep", "repeat"] };

// Generate a TypeScript type from the object
const tsType = generateTypeScriptType(myObj);
console.log(tsType);

// Output:
type GeneratedType = {
  id: number;
  name: string;
  tasks: string[];
};
```

## Real-World Examples

### Handling a Complex API Response

When working with dynamic API responses, `typescript_scribe` can infer complex nested structures, saving you time on manual type definition.

```ts
const apiResponse = {
  user: {
    id: 1,
    name: "John Doe",
    address: {
      city: "New York",
      postalCode: 10001,
    },
    tags: ["admin", "contributor"],
    settings: {
      newsletter: true,
      timezone: "EST",
    },
  },
};

// Infer the structure of the response
const inferredApiResponse = inferType(apiResponse);
console.log(inferredApiResponse);

// Output:
{
  user: {
    id: 'number',
    name: 'string',
    address: {
      city: 'string',
      postalCode: 'number',
    },
    tags: ['string'],
    settings: {
      newsletter: 'boolean',
      timezone: 'string',
    }
  }
}
```

### Inferring Types for Dynamic Form Data

Working with dynamic forms? Let typescript_scribe infer the structure of the collected data for you.

```ts
const formData = {
  name: "Jane Doe",
  age: 29,
  preferences: {
    theme: "dark",
    notifications: true,
  },
  items: [
    { id: 1, name: "Item 1", price: 9.99 },
    { id: 2, name: "Item 2", price: 19.99 },
  ],
};

// Generate the TypeScript type from the dynamic form data
const tsFormDataType = generateTypeScriptType(formData, "FormData");
console.log(tsFormDataType);

// Output:
type FormData = {
  name: string;
  age: number;
  preferences: {
    theme: string;
    notifications: boolean;
  };
  items: {
    id: number;
    name: string;
    price: number;
  }[];
};
```

## Advanced Usage

### Custom Type Names

You can customize the name of the generated TypeScript type by passing a second argument to `generateTypeScriptType`.

```ts
const myObj = { id: 1, name: "Anthony", tasks: ["code", "sleep", "repeat"] };

const tsType = generateTypeScriptType(myObj, 'CustomType');
console.log(tsType);

// Output:
type CustomType = {
  id: number;
  name: string;
  tasks: string[];
};
```

### Nested Object Structures

`typescript_scribe` can infer nested objects and arrays, handling complex structures seamlessly.

```ts
const complexObj = {
  id: 1,
  profile: {
    name: "Anthony",
    details: {
      age: 35,
      skills: ["TypeScript", "JavaScript", "AWS"]
    }
  }
};

const inferredComplex = inferType(complexObj);
console.log(inferredComplex);

// Output:
{
  id: 'number',
  profile: {
    name: 'string',
    details: {
      age: 'number',
      skills: ['string']
    }
  }
}

const tsComplexType = generateTypeScriptType(complexObj, 'ComplexType');
console.log(tsComplexType);

// Output:
type ComplexType = {
  id: number;
  profile: {
    name: string;
    details: {
      age: number;
      skills: string[];
    };
  };
};
```

## TypeScript Types

The `InferredType` returned by `inferType` can be one of the following:

- `'string'`, `'number'`, `'boolean'` for primitives.
- `'Date'` for `Date` objects.
- `'Promise'` for Promise objects.
- `'null'`, `'undefined'` for null and undefined values.
- `'mixed'` for arrays with mixed types.
- `['unknown']` for empty arrays.
- A nested type structure for objects.


## Handling Edge Cases

- **Arrays with Mixed Types**: If an array contains elements of different types (e.g., `[1, 'a', true]`), the inferred type will be `['mixed']`.
- **Empty Objects and Arrays**: Empty objects will return `{}`, and empty arrays will return `['unknown']`.
- **Functions**: Functions are not supported and will throw an error if passed into `inferType`.
- **Circular References**: Circular references are not supported and may cause the function to throw an error or behave unexpectedly.

## Additional Notes

- **Date Handling**: `Date` objects are inferred as `'Date'` to ensure accurate type inference, reflecting their use as a specialized type in TypeScript.
- **Empty Arrays**: Empty arrays are inferred as `['unknown']`, representing an array with unknown element types.
- **Function Error**: If a function is passed to `inferType`, an error will be thrown because functions are not supported for type inference.

## Known Issues and Limitations

- Currently, circular references are not handled.
- Very large objects with deep nesting might impact performance.
- Certain JavaScript-specific objects (e.g., `Map`, `Set`) are not yet supported for type inference.


## Contributing

### Support the project
If you find this library helpful and want to support its development, consider [buying me a coffee](https://www.buymeacoffee.com/anthonymazzie) ☕. Your support fuels my ability to keep building great tools for the community!

### How to contribute
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

For large changes, [open an issue](https://github.com/AnthonyMazzie/typescript_scribe/issues) first to discuss the potential implementation.

### Pipeline

We are currently implementing a **GitHub Actions** pipeline (work in progress) to automate the testing, linting, and publishing process for the project. This will ensure:

1. Every pull request is automatically tested using **Vitest**.
2. Linting is enforced with **XO** to maintain code quality.
3. Successful changes are packaged and prepared for **npm** publishing.

### Future Pipeline Improvements
- Cross-environment compatibility testing.

### Linting with XO

We use **XO** as our linter because it enforces best practices and works seamlessly with TypeScript and JavaScript projects.

To run the linter:

```bash
npm run lint
```

For more details, check out the official [XO documentation](https://github.com/xojs/xo).

### Testing with Vitest

We use **Vitest** as the test framework because it's modern, fast, and supports both TypeScript and ES Modules seamlessly.

To run the tests:

```bash
npm run test
```

For more details, check out the official [Vitest documentation](https://vitest.dev/).

## License
This project is licensed under the MIT License.

---

[Return to top](#typescript_scribe)