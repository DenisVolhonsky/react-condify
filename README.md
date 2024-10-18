# React Conditional Render [![npm version](https://badge.fury.io/js/react-condify.svg)](https://badge.fury.io/js/react-condify)

A flexible library for managing conditional rendering of components in React applications with a simple and intuitive syntax.

Created with ❤️ for React developers who need a clear, reusable way to handle conditional rendering.

## Installation

To install the library, you can use either `npm` or `yarn`:

```bash
npm install react-condify
```

or

```bash
yarn add react-condify
```

## Components

This library provides two main components for conditional rendering:

1. **[`Cond`](#cond-component)**: Basic conditional rendering for synchronous operations.
2. **[`AsyncCond`](#asynccond-component)**: Conditional rendering for asynchronous operations with support for caching and polling.

---

## `Cond` Component

The `Cond` component is used to render a specific component based on a condition or an array of conditions.

### Props

- `condition` (optional): A boolean value determining whether to render the component in `then` or `fallback`.
- `then` (optional): The component that will be rendered if `condition` is `true`.
- `cases` (optional): An array of condition objects, where each object contains a `condition` and a `then` component to render.
- `fallback` (optional): The component to render if no conditions are met or `condition` is `false`.

### Example

#### Simple usage with `condition`

```jsx
import React from "react";
import { Cond } from "react-condify";

const MyComponent = () => {
  const isLoggedIn = true;

  return (
    <Cond
      condition={isLoggedIn}
      then={() => <Dashboard />}
      fallback={() => <Login />}
    />
  );
};
```

#### Usage with multiple conditions using `cases`

```jsx
import React from "react";
import { Cond } from "react-condify";

const MyComponent = () => {
  const status = "loading";

  return (
    <Cond
      cases={[
        { condition: status === "loading", then: () => <Loading /> },
        { condition: status === "error", then: () => <Error /> },
      ]}
      fallback={() => <Data />}
    />
  );
};
```

---

## `AsyncCond` Component

The `AsyncCond` component provides conditional rendering based on asynchronous operations, such as API requests. It supports caching and polling for repeated requests.

### Props

- `asyncFunction`: A function that returns a promise. The result of this promise will determine which component to render.
- `then`: A render prop that takes the resolved data as an argument and returns the component to render.
- `else`: The component to render if the async function returns no result (empty).
- `loading`: The component to render while the async function is in progress.
- `error`: The component to render if the async function throws an error.
- `polling` (optional): A number (in seconds) to periodically re-execute the async function. Defaults to no polling.
- `cacheKey` (optional): A string key to store the result of the async function in `localStorage`. If the result is cached, it will be retrieved from cache on subsequent renders.
- `onError` (optional): A function to handle any errors that occur during the async operation.

### Example

#### Simple usage without polling or caching

```jsx
import React from "react";
import { AsyncCond } from "react-condify";

const MyComponent = () => {
  const fetchData = () => fetch("/api/data").then((res) => res.json());

  return (
    <AsyncCond
      asyncFunction={fetchData}
      then={(data) => <Data data={data} />}
      else={<NoData />}
      loading={<Loading />}
      error={<Error />}
    />
  );
};
```

#### Usage with polling and caching

```jsx
import React from "react";
import { AsyncCond } from "react-condify";

const MyComponent = () => {
  const fetchData = () => fetch("/api/data").then((res) => res.json());

  return (
    <AsyncCond
      asyncFunction={fetchData}
      then={(data) => <Data data={data} />}
      else={<NoData />}
      loading={<Loading />}
      error={<Error />}
      polling={60} // Poll every 60 seconds
      cacheKey="myDataKey" // Cache the data with this key
    />
  );
};
```

### Error handling

If you want to catch and log errors that happen during the async function execution, you can pass an `onError` callback:

```jsx
import React from "react";
import { AsyncCond } from "react-condify";

const MyComponent = () => {
  const fetchData = () => fetch("/api/data").then((res) => res.json());

  return (
    <AsyncCond
      asyncFunction={fetchData}
      then={(data) => <Data data={data} />}
      else={<NoData />}
      loading={<Loading />}
      error={<Error />}
      onError={(err) => console.error("An error occurred:", err)}
    />
  );
};
```

---

## License

This project is licensed under the MIT License.

---

## Badges

[![npm version](https://badge.fury.io/js/react-condify.svg)](https://badge.fury.io/js/react-condify)
[![Node.js CI](https://github.com/username/react-condify/actions/workflows/node.js.yml/badge.svg)](https://github.com/username/react-condify/actions/workflows/node.js.yml)

## Links

- [GitHub Repository](https://github.com/DenisVolhonsky/react-condify)
- [NPM Package](https://www.npmjs.com/package/react-condify)

See also:

- 🦉 [lowdb - local JSON database](https://github.com/typicode/lowdb)
- 🐶 [husky - Git hooks made easy](https://github.com/typicode/husky)
