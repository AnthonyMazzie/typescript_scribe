## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the library. Whether it's bug fixes, new features, or documentation improvements, all contributions help make the project better.

For more details on contributing, visit the [GitHub repository](https://github.com/AnthonyMazzie/type-scribe).

---

## 🚀 Pipeline

We are currently implementing a **GitHub Actions** pipeline (work in progress) to automate the testing, linting, and publishing process for the project. This will ensure:

1. Every pull request is automatically tested using **Vitest**.
2. Linting is enforced with **XO** to maintain code quality.
3. Successful changes are packaged and prepared for **npm** publishing.

---

### Future Steps
- Automating the publishing process to **npm** after tests pass on the `main` branch.
- Adding coverage reports for better code health insights.
- Ensuring cross-environment compatibility testing.

Stay tuned for updates!

---

## ⚙️ Linting with XO

We use **XO** as our linter because it enforces best practices and works seamlessly with TypeScript and JavaScript projects.

To run the linter:

```bash
npm run lint
```

For more details, check out the official [XO documentation](https://github.com/xojs/xo).

## 🧪 Testing with Vitest

We use **Vitest** as the test framework because it's modern, fast, and supports both TypeScript and ES Modules seamlessly.

To run the tests:

```bash
npm run test
```

For more details, check out the official [Vitest documentation](https://vitest.dev/).

---

[Back to Home](README.md)
