# typescript_scribe

![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue.svg)
![GitHub](https://img.shields.io/github/license/AnthonyMazzie/typescript_scribe)
![npm](https://img.shields.io/npm/v/typescript_scribe)
![npm](https://img.shields.io/npm/dt/typescript_scribe)

`typescript_scribe` is a lightweight library that automatically infers the structure of JavaScript objects and generates corresponding TypeScript types. It helps engineers quickly generate type definitions from dynamic data, reducing manual work and improving code quality.

## Table of Contents
1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
   - [Infer Type](#infer-type)
   - [Generate TypeScript Type](#generate-typescript-type)
3. [Advanced Usage](#advanced-usage)
   - [Custom Type Names](#custom-type-names)
   - [Nested Object Structures](#nested-object-structures)
4. [Development](#development)
   - [Contributing](#contributing)
   - [Linting with XO](#linting-with-xo)
   - [Testing with Vitest](#testing-with-vitest)
6. [License](#license)

## Installation

To install the library:

```bash
npm install typescript_scribe
```

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

/* Output:
{
  id: 'number',
  name: 'string',
  time: 'Date',
  tasks: ['string']
}
*/
```

### Generate TypeScript Type

Use `generateTypeScriptType` to generate a TypeScript type definition based on the inferred structure.

```ts
import { generateTypeScriptType } from 'typescript_scribe';

const myObj = { id: 1, name: "Anthony", tasks: ["code", "test"] };

// Generate a TypeScript type from the object
const tsType = generateTypeScriptType(myObj);
console.log(tsType);

/* Output:
type GeneratedType = {
  id: number;
  name: string;
  tasks: string[];
};
*/
```

## Advanced Usage

### Custom Type Names

You can customize the name of the generated TypeScript type by passing a second argument to `generateTypeScriptType`.

```ts
const myObj = { id: 1, name: "Anthony", tasks: ["code", "test"] };

const tsType = generateTypeScriptType(myObj, 'CustomType');
console.log(tsType);

/* Output:
type CustomType = {
  id: number;
  name: string;
  tasks: string[];
};
*/
```

### Nested Object Structures

`typescript_scribe` can infer nested objects and arrays, handling complex structures seamlessly.

```ts
const complexObj = {
  id: 1,
  profile: {
    name: "Anthony",
    details: {
      age: 30,
      skills: ["TypeScript", "JavaScript"]
    }
  }
};

const inferredComplex = inferType(complexObj);
console.log(inferredComplex);
/* Output:
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
*/

const tsComplexType = generateTypeScriptType(complexObj, 'ComplexType');
console.log(tsComplexType);
/* Output:
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

## Development

For those contributing or working on the project, here are some key details:

### Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the library. Whether it's bug fixes, new features, or documentation improvements, all contributions help make the project better.

For more details on contributing, visit the [GitHub repository](https://github.com/AnthonyMazzie/typescript_scribe).

### Linting with XO

We use **XO** as our linter for `typescript_scribe` because it is a zero-config, opinionated linter that works great for TypeScript and JavaScript projects. It enforces best practices with minimal configuration, making it a lightweight and fast tool to keep the codebase clean.

To run the linter:

```bash
npm run lint
```

For more details, check out the official [XO documentation](https://github.com/xojs/xo).

### Testing with Vitest

**Vitest** was chosen as the test framework for this project because it is modern, fast, and supports both TypeScript and ES Modules seamlessly. Vitest’s API is similar to Jest, but with much better performance, making it perfect for TypeScript libraries.

To run the tests:

```bash
npm run test
```

For more details, check out the official [Vitest documentation](https://vitest.dev/).

## License
This project is licensed under the MIT License.

---

[Return to top](#typescript_scribe)
