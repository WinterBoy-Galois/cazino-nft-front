# CaZZZino Frontend

This project is based on create-react-app. For more information and docs visit [create-react-app.dev](https://create-react-app.dev/)

test2

## Getting started

```bash
$ yarn
$ yarn start
```

## Production build

```bash
$ yarn build
```

Build artefacts can found in `/build`

## Features

### Linting and formatting

#### Run all

```bash
$ yarn lint
```

#### TS Lint

```bash
$ yarn lint:ts
```

#### stylelint

```bash
$ yarn lint:scss
```

#### Prettier

```bash
$ yarn format
```

### Git Hooks

The `pre-commit` hook runs linting on ts and scss files, and formats all staged files with prettier.

The `pre-push` hook runs all unit tests.

### Storybook

Use Storybook to develop components in an independent environment that allows you to simulate different states.

```bash
$ yarn storybook
```

### Analyze bundle and chunk size

```bash
$ yarn build && yarn analyze
```

### Unit Testing

#### Watch mode

```bash
$ yarn test
```

#### Single run

```bash
$ yarn test:single
```



### Debugging (VS Code)

While running `yarn start` the debugger can be attached by pressing F5.

Note:
You need to have to have [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) installed.















#














