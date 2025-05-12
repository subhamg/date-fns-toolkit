# Contributing to date-fns-toolkit

Thank you for your interest in contributing to date-fns-toolkit! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/date-fns-toolkit.git`
3. Install dependencies: `npm install`
4. Run tests: `npm test`

## Development Workflow

1. Create a branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Run type checking: `npm run typecheck`
6. Commit your changes using [conventional commits](https://www.conventionalcommits.org/)
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a pull request

## Pull Request Guidelines

- Include tests for any new functionality
- Update documentation for API changes
- Follow the existing code style
- Keep pull requests focused on a single topic
- Reference any relevant issues in your PR description

## Testing

We use Jest for testing. Run the test suite with:

```bash
npm test
```

For watching mode during development:

```bash
npm run test:watch
```

For coverage report:

```bash
npm run test:coverage
```

## Code Style

We use ESLint and Prettier for code style. Run linting with:

```bash
npm run lint
```

Fix linting issues automatically with:

```bash
npm run lint:fix
```

## TypeScript

We use TypeScript for type checking. Run type checking with:

```bash
npm run typecheck
```

## Building

Build the project with:

```bash
npm run build
```

## Documentation

Please update documentation when making changes that affect the public API.

## Release Process

Releases are handled by the maintainers using GitHub Actions. The workflow is:

1. Update version in package.json
2. Create a GitHub release
3. GitHub Actions will automatically publish to npm

## License

By contributing to date-fns-toolkit, you agree that your contributions will be licensed under the project's [MIT License](LICENSE). 