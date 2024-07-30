```
const callAPI = (a) => {
  console.log("api called", a);
};

callAPI("normal -1");
callAPI("normal -2");
callAPI("normal -3");
callAPI("normal -4");

// debouncing :  wait for a specific time before calling next function
const debounced = (func, delay) => {
  var timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const debouncedCall = debounced(callAPI, 300);

debouncedCall("debouncedCall -1");
debouncedCall("debouncedCall -2");
debouncedCall("debouncedCall -3");
debouncedCall("debouncedCall -4");

// throttling : only one request in a specific time interval
function throttle(func, interval) {
  let lastExecutionTime = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastExecutionTime >= interval) {
      lastExecutionTime = now;
      func.apply(this, args);
    }
  };
}

const throttledCall = throttle(callAPI, 300);

throttledCall("throttledCall -1");
throttledCall("throttledCall -2");
throttledCall("throttledCall -3");
throttledCall("throttledCall -4");

// rate limiting :called a specified number of times within a certain time window.
function rateLimit(func, limit, interval) {
  let calls = 0;
  let startTime = Date.now();

  return function (...args) {
    const now = Date.now();

    if (now - startTime > interval) {
      // Reset the counter and start time if the interval has passed
      calls = 0;
      startTime = now;
    }

    if (calls < limit) {
      calls++;
      func(...args);
    } else {
      console.log("Rate limit exceeded");
    }
  };
}

const rateLimitedCall = rateLimit(callAPI, 2, 300);

rateLimitedCall("rateLimitedCall -1");
rateLimitedCall("rateLimitedCall -2");
rateLimitedCall("rateLimitedCall -3");
rateLimitedCall("rateLimitedCall -4");


```


Thinking in React: https://react.dev/learn/thinking-in-react
Start with the mockup
Break the UI into a component hierarchy 
Build a static version in React
build a version that renders the UI from your data model without adding any interactivity 
Use props for passing data, but don’t use state at all 
Find the minimal but complete representation of UI state
Figure out the absolute minimal representation of the state your application needs and compute everything else on-demand
Identify where your state should live 
 identify which component is responsible for changing this state, or owns the state
Identify components that use state
Find their common parent, if state is shared
Decide where the state lives

Export:--
one default export, but it can have as many named exports 
Default export:
export default function Component(x) { … }

import Component from "./my-module.js";
Named export:
function Component(x) { … }
const foo = …..
export { cube, foo}

import { cube, foo} from "./my-module.js";

Pure Component:
does not change any objects or variables that existed before it was called
Predictable, Given the same inputs, a pure function should always return the same result.
React’s rendering process must always be pure. Components should only return their JSX, and not change any objects or variables that existed before rendering—that would make them impure!

React offers a “Strict Mode” in which it calls each component’s function twice during development. By calling the component functions twice, Strict Mode helps find components that break these rules.
To opt into Strict Mode, you can wrap your root component into <React.StrictMode>


React Side-Effect:-
 anything that is outside the scope of React
calling any native Web API
Making a HTTPS request to an external API
using native DOM methods

useEffect(() => {
 localStorage.setItem('some key', true);	       // or
document.getElementById("overlay").style.display = "block";
}, []);

side effects usually belong inside event handlers
usually manage React side effects inside the useEffect hook 

What is Reconcilation in React ?


In React, **reconciliation** is the process through which React updates the DOM to match the desired state of the application. React uses a virtual DOM to efficiently manage and update changes in the user interface. When the state or props of a component change, React needs to determine how to update the DOM to reflect these changes. Here's how reconciliation works:

### Key Concepts of Reconciliation:

1. **Virtual DOM:**
   - React maintains a lightweight representation of the actual DOM called the virtual DOM.
   - When changes occur, React creates a new virtual DOM tree to represent the updated UI.

2. **Diffing Algorithm:**
   - React compares the new virtual DOM with the previous virtual DOM using a process known as "diffing."
   - It identifies the differences between the two trees to determine the minimal number of changes required to update the real DOM.

3. **Efficient Updates:**
   - Instead of updating the entire DOM, React only updates the parts of the DOM that have changed.
   - This minimizes the number of operations and improves performance, as direct DOM manipulations can be costly.

4. **Component Keys:**
   - When rendering lists of elements, keys help React identify which items have changed, been added, or been removed.
   - Keys should be stable, predictable, and unique to each list item to ensure correct and efficient updates.

5. **Batching Updates:**
   - React batches multiple state updates and applies them together to avoid unnecessary re-renders.

### Steps in the Reconciliation Process:

1. **State/Props Update:**
   - When a component's state or props change, React schedules a render to update the component.

2. **Render Method:**
   - The component's `render` method is called, generating a new virtual DOM tree.

3. **Diffing and Patching:**
   - React compares the new virtual DOM with the previous one using the diffing algorithm.
   - It calculates the minimum number of operations required to update the real DOM.

4. **Update the DOM:**
   - React applies the calculated changes to the actual DOM, ensuring the UI is updated efficiently.

### Example:

Consider a simple component that renders a list of items. When an item is added or removed, React will:

1. Generate a new virtual DOM representing the updated list.
2. Diff the new virtual DOM against the old one.
3. Identify the specific changes (e.g., a new item added).
4. Update the real DOM with only those changes.

Here's a simple example:

```jsx
import React, { useState } from 'react';

function ItemList() {
  const [items, setItems] = useState(['Item 1', 'Item 2']);

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default ItemList;
```

In this example, when the "Add Item" button is clicked, a new item is added to the list. React will reconcile the changes by adding only the new item to the DOM instead of re-rendering the entire list.

### Conclusion:

Reconciliation is a core part of React's performance optimization strategy. By efficiently updating only the parts of the DOM that have changed, React ensures that applications remain fast and responsive, even as the complexity of the UI grows.


Why we can not use Class , instead using className?

In React, you use `className` instead of `class` to define CSS classes for an element because `class` is a reserved keyword in JavaScript. Here's a detailed explanation of why this distinction is necessary and how it fits into the React framework:

### Why `className` Instead of `class`?

1. **JavaScript Reserved Keyword:**
   - In JavaScript, `class` is a reserved keyword used to define classes for object-oriented programming.
   - Using `class` as a property name in JSX would cause a syntax conflict, as it is already used for defining ES6 classes.

2. **JSX Syntax:**
   - JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.
   - When you write JSX, it is transformed into JavaScript function calls. Using `class` would conflict with JavaScript syntax and cause parsing errors.

3. **Avoiding Confusion:**
   - To avoid confusion and potential errors, React uses `className` as a way to specify CSS classes, ensuring that there is no conflict with JavaScript's reserved keywords.

### How `className` Works in React

- **JSX Transformation:**
  - JSX elements are transformed into `React.createElement()` function calls during the compilation process.
  - The `className` attribute in JSX is translated into the `className` property of the HTML element created by `React.createElement()`.

- **Example:**

  ```jsx
  const MyComponent = () => {
    return (
      <div className="my-class">
        Hello, world!
      </div>
    );
  };

  // Transformed by JSX compiler to:
  const MyComponent = () => {
    return React.createElement('div', { className: 'my-class' }, 'Hello, world!');
  };
  ```

### Comparison: `class` vs. `className`

- **JavaScript ES6 Class:**

  ```javascript
  class MyClass {
    constructor() {
      // Class logic
    }
  }
  ```

- **React JSX:**

  ```jsx
  <div className="my-class">
    This is a div with a CSS class.
  </div>
  ```

  Using `className` in JSX ensures that there is no overlap or conflict with JavaScript's use of `class` for defining classes.

### Advantages of Using `className`

- **Consistency:**
  - By using `className`, React maintains a consistent syntax that aligns with JavaScript standards, making it easier for developers familiar with JavaScript to work with React.

- **Clarity:**
  - It provides clarity by distinguishing between JavaScript classes and CSS classes, reducing potential confusion.

- **Compatibility:**
  - Ensures compatibility with JavaScript parsers and compilers, avoiding syntax errors.

### Conclusion

In summary, using `className` instead of `class` in React JSX is a practical decision that avoids syntax conflicts with JavaScript's reserved keywords and ensures that JSX code is parsed correctly. This distinction allows React to seamlessly integrate with JavaScript while maintaining a clear and intuitive API for defining CSS classes in components.


Controlled <-> uncontrolled component

In React, the terms **controlled components** and **uncontrolled components** refer to how form elements and their values are managed. Understanding the difference between these two types of components is crucial for building forms and handling user inputs in a React application. Let's delve into the specifics of each.

## Controlled Components

### Definition

Controlled components are form elements whose values are managed by React state. In a controlled component, form data is handled by a React component, which means the component fully controls the form element's state through `useState` or other state management techniques.

### Characteristics

- **State Management**: The component's state represents the form data. Any changes to the form input are managed through React state.
- **Single Source of Truth**: The form element's value is determined by the state. The input value is always in sync with the state.
- **Explicit Updates**: Updates to the form element's value occur through event handlers that update the component's state.

### Benefits

- **Predictable State Management**: Since the state is the single source of truth, it's easy to manage and track changes.
- **Validation and Formatting**: Validation and formatting logic can be applied directly in the component's state update functions.
- **Consistent UI Updates**: UI is updated consistently as the state changes.

### Example

Here is an example of a controlled component using a text input:

```jsx
import React, { useState } from 'react';

function ControlledForm() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ControlledForm;
```

- **State**: The `name` state variable holds the current input value.
- **Event Handler**: The `handleChange` function updates the state whenever the input changes.
- **Controlled Input**: The input element's value is always synchronized with the state.

### Use Cases

- When you need to validate user input.
- When you want to format input (e.g., date or currency formatting).
- When the input state is needed elsewhere in the component or application (e.g., live search suggestions).

## Uncontrolled Components

### Definition

Uncontrolled components are form elements where the DOM itself maintains the form data. React does not manage the state of the form inputs directly; instead, you access input values through references (refs) to the DOM elements.

### Characteristics

- **DOM-Based State Management**: The DOM handles the form input values rather than React state.
- **Less Boilerplate**: Uncontrolled components often require less setup code since state management is handled by the DOM.
- **Direct DOM Access**: You use `React.createRef` or `useRef` to access the input values directly.

### Benefits

- **Simplicity**: For simple forms or when integrating with non-React code, uncontrolled components can be simpler to implement.
- **Initial Value Setting**: Default values can be set using the defaultValue attribute, and the DOM manages the state.

### Example

Here is an example of an uncontrolled component using a text input:

```jsx
import React, { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted name: ${nameRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={nameRef} defaultValue="John Doe" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
```

- **Ref**: `nameRef` is a reference to the input DOM element.
- **Accessing Value**: `nameRef.current.value` is used to get the current input value when the form is submitted.
- **DOM Management**: The value is managed directly by the DOM, not React state.

### Use Cases

- When integrating with non-React libraries that manipulate the DOM directly.
- When working with large forms where performance is a concern, and you want to minimize React state updates.
- When you don't need to validate or format input values before form submission.

## Key Differences

| Feature              | Controlled Components                              | Uncontrolled Components                      |
|----------------------|----------------------------------------------------|---------------------------------------------|
| **State Management** | Managed by React state                             | Managed by the DOM                          |
| **Input Value**      | Synchronized with state                            | Accessed via refs                           |
| **Data Flow**        | Unidirectional, from state to input                | Bidirectional, between DOM and component    |
| **Setup**            | Requires state and event handlers                  | Requires refs for accessing values          |
| **Use Cases**        | Form validation, complex forms, dynamic UI updates | Simple forms, integration with non-React code |

## Conclusion

- **Controlled Components**: Ideal for cases where you need precise control over form data, validation, and when you want the React state to represent the form values directly. They provide a more predictable and testable approach.
- **Uncontrolled Components**: Suitable for simple forms or when integrating with third-party libraries that manipulate the DOM. They require less boilerplate and can be easier to implement for straightforward scenarios.

By understanding the differences and use cases for controlled and uncontrolled components, you can choose the best approach for managing form data in your React applications. If you have further questions or need more examples, feel free to ask!


Debouncing <-> rate limiting <-> throttling 

Here's a breakdown of how you can implement simple functions for debouncing, rate limiting, and throttling in JavaScript. These utility functions are useful for managing the frequency of function execution in response to events like resizing a window, scrolling, or typing in a search box.

## Debouncing

Debouncing ensures that a function is only executed once after a certain delay, preventing it from running too frequently. This is particularly useful for scenarios like input validation, search suggestions, or resizing events, where you only want to perform an action once after the user has stopped inputting data for a set period of time.

### Implementation

Here's a simple implementation of a debounce function:

```javascript
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

### How It Works

- **`func`**: The function you want to debounce.
- **`delay`**: The delay in milliseconds to wait before executing the function after the last call.

- **Logic**: 
  - Every time the returned function is called, it clears the previous timer and sets a new one.
  - The function (`func`) is only executed if the returned function hasn't been called within the specified delay.

### Example Usage

Here's an example of using debounce to handle a search input:

```javascript
function handleSearch(query) {
  console.log(`Searching for: ${query}`);
}

const debouncedSearch = debounce(handleSearch, 300);

document.getElementById('searchInput').addEventListener('input', (event) => {
  debouncedSearch(event.target.value);
});
```

- **Scenario**: This will log the search query 300 milliseconds after the user stops typing, reducing the number of API calls or computations needed.

## Throttling

Throttling ensures that a function is executed at most once in a specified time interval. It’s useful for controlling the rate of function execution in high-frequency events like window resizing, scrolling, or mouse movement.

### Implementation

Here's a simple implementation of a throttle function:

```javascript
function throttle(func, interval) {
  let lastExecutionTime = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastExecutionTime >= interval) {
      lastExecutionTime = now;
      func.apply(this, args);
    }
  };
}
```

### How It Works

- **`func`**: The function you want to throttle.
- **`interval`**: The minimum time interval (in milliseconds) between consecutive function executions.

- **Logic**: 
  - The function is executed immediately if it hasn’t been executed in the last `interval` milliseconds.
  - If it has been executed recently, it waits until the interval has passed before executing again.

### Example Usage

Here's an example of using throttle to handle a window resize event:

```javascript
function handleResize() {
  console.log('Window resized');
}

const throttledResize = throttle(handleResize, 200);

window.addEventListener('resize', throttledResize);
```

- **Scenario**: This ensures that the `handleResize` function is called at most once every 200 milliseconds, reducing the load on performance-heavy computations.

## Rate Limiting

Rate limiting is similar to throttling but often involves more complex logic, such as allowing a function to be called a specified number of times within a certain time window.

### Implementation

Here's a basic implementation of a rate-limiting function that allows a function to be called a certain number of times within a time period:

```javascript
function rateLimit(func, limit, interval) {
  let calls = 0;
  let startTime = Date.now();

  return function (...args) {
    const now = Date.now();

    if (now - startTime > interval) {
      // Reset the counter and start time if the interval has passed
      calls = 0;
      startTime = now;
    }

    if (calls < limit) {
      calls++;
      func.apply(this, args);
    } else {
      console.log('Rate limit exceeded');
    }
  };
}
```

### How It Works

- **`func`**: The function you want to rate limit.
- **`limit`**: The maximum number of times the function can be called in the specified interval.
- **`interval`**: The time window (in milliseconds) within which the function can be called a limited number of times.

- **Logic**: 
  - The function is allowed to execute up to `limit` times within the specified `interval`.
  - If the interval has passed since the first call, the counter resets.

### Example Usage

Here's an example of using rate limiting for API calls:

```javascript
function fetchData() {
  console.log('Fetching data from API');
}

const limitedFetch = rateLimit(fetchData, 5, 10000);

document.getElementById('fetchButton').addEventListener('click', () => {
  limitedFetch();
});
```

- **Scenario**: This allows the `fetchData` function to be called up to 5 times every 10 seconds. If the user tries to call it more than 5 times in that period, the call is skipped, and a message is logged.

## Conclusion

- **Debouncing**: Useful for delaying the execution of a function until after a specified delay following the most recent call. Ideal for scenarios like search inputs and resizing windows.
- **Throttling**: Useful for ensuring a function is executed at most once per specified interval. Ideal for controlling the execution frequency of high-frequency events like scrolling or resizing.
- **Rate Limiting**: Useful for limiting the number of times a function can be executed within a given time window. Ideal for API calls or other resource-intensive operations.

Each of these techniques serves different purposes and can significantly improve the performance and responsiveness of your applications. If you have further questions or need more examples, feel free to ask!





