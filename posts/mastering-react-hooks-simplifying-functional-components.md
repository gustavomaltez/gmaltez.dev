---
title: Mastering React Hooks by Simplifying Functional Components
published_at: 2023-05-25T10:00:00.000Z
snippet: A deep dive into React hooks and their usage in functional components. In this blog post, we will explore some commonly used React hooks and see how they can simplify our code. For example, we will see how to use the useState hook to manage state in a functional component. Furthermore, we will see how to use the useEffect hook to perform side effects in a functional component. Finally, we will see how to use the useContext hook to access the context in a functional component.
tags: fake-post, react, hooks, useState, useEffect, useContext
---

 

# What are React hooks?

React hooks are a powerful feature introduced in React 16.8 that allows us to use state and other React features in functional components. In this blog post, we will explore some commonly used React hooks and see how they can simplify our code.

## useState

The `useState` hook is used to manage state in a functional component. Here's an example of how to use `useState`:

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
```

In the above example, we are using the `useState` hook to create a state variable called `count` and a function called `setCount` to update the state. The `useState` hook takes an initial value as an argument and returns an array with the state variable and the function to update the state.

## useEffect

The `useEffect` hook is used to perform side effects in a functional component. Here's an example of how to use `useEffect`:

```jsx
import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
```

In the above example, we are using the `useEffect` hook to update the document title whenever the `count` state variable changes. The `useEffect` hook takes a function as an argument and executes it after every render. If you want to execute the function only once, you can pass an empty array as the second argument to the `useEffect` hook.

## useContext

The `useContext` hook is used to access the context in a functional component. Here's an example of how to use `useContext`:

```jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value="dark">
      {children}
    </ThemeContext.Provider>
  );
};

const Button = () => {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme }}>
      Click me
    </button>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Button />
    </ThemeProvider>
  );
};

export default App;
```

In the above example, we are using the `useContext` hook to access the context value in the `Button` component. The `useContext` hook takes a context object as an argument and returns the current context value.
