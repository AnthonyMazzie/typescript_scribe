# typescript_scribe

![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue.svg)
![GitHub](https://img.shields.io/github/license/AnthonyMazzie/typescript_scribe)
![npm](https://img.shields.io/npm/v/typescript_scribe)
![npm](https://img.shields.io/npm/dt/typescript_scribe)

`typescript_scribe` is a lightweight library that automatically infers the structure of JavaScript objects and generates corresponding TypeScript types. It helps engineers quickly generate type definitions from dynamic data, reducing manual work and improving code quality.

<div style="display: flex; align-items: center;">
  <div style="text-align: center;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js Logo" width="80" height="80" />
    <p>Node.js</p>
  </div>
  <div style="text-align: center; margin-left: 20px;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript Logo" width="80" height="80" />
    <p>JavaScript</p>
  </div>
  <div style="text-align: center; margin-left: 20px;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript Logo" width="80" height="80" />
    <p>TypeScript</p>
  </div>
</div>


## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Basic Usage](#basic-usage)
   - [Infer Type](#infer-type)
   - [Generate TypeScript Type](#generate-typescript-type)
4. [Advanced Usage](#advanced-usage)
   - [Custom Type Names](#custom-type-names)
   - [Nested Object Structures](#nested-object-structures)
5. [Contributing](#contributing)
   - [Support the project](#support-the-project)
   - [Pipeline](#pipeline)
   - [Linting with XO](#linting-with-xo)
   - [Testing with Vitest](#testing-with-vitest)
6. [License](#license)

---

## Prerequisites

- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed (version 16.x or above recommended).
- **npm**: Ensure npm is installed. It comes bundled with Node.js.
- **TypeScript**: You should have [TypeScript](https://www.typescriptlang.org/download/) installed and set up in your project.

## Installation

`npm install typescript_scribe` or `yarn add typescript_scribe`

---


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

---

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

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the library. Whether it's bug fixes, new features, or documentation improvements, all contributions help make the project better.

For more details on contributing, visit the [GitHub repository](https://github.com/AnthonyMazzie/typescript_scribe).

### Support the project
If you find this library helpful and want to support its development, consider [buying me a coffee](https://www.buymeacoffee.com/anthonymazzie) ☕. Your support fuels my ability to keep building great tools for the community!

---

### Pipeline

We are currently implementing a **GitHub Actions** pipeline (work in progress) to automate the testing, linting, and publishing process for the project. This will ensure:

1. Every pull request is automatically tested using **Vitest**.
2. Linting is enforced with **XO** to maintain code quality.
3. Successful changes are packaged and prepared for **npm** publishing.

---

### Future Pipeline Improvements
- Automating the publishing process to **npm** after tests pass on the `main` branch.
- Adding coverage reports for better code health insights.
- Ensuring cross-environment compatibility testing.

---

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
