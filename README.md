# Cadasta React-Esri Client

[![Edit esri-react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/Cadasta/react-arcgis)

Example app to explore how stuff works.

- Uses WebMap [Survey Map](https://cadasta.maps.arcgis.com/home/item.html?id=459eb07ed2544fd4b655b87dca7abf8c)

TODO:
- Document core libraries:
  - [react-arcgis](https://github.com/nicksenger/react-arcgis)
- Discuss code layout
  - Should we use more of a feature-based layout? https://marmelab.com/blog/2015/12/17/react-directory-structure.html
- Polyfills
  - From [react-arcgis](https://github.com/nicksenger/react-arcgis):
    > If you need to support browsers lacking a native promise implementation, you will have to add a global Promise constructor polyfill to your project, as react-arcgis does not include one. I recommend [es6-promise](https://www.npmjs.com/package/es6-promise).
- Add [ErrorBoundaries](https://reactjs.org/docs/error-boundaries.html)

---

## Development

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) using the [TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter).  More documentation can be found in either of those repositories' READMEs.

The codebase follows the conventions of [Containers vs Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).  It is strongly recommended that you familiarize yourself with those concepts.

### Installation

```bash
yarn global add create-react-app // Install create-react-app
yarn // Install package dependencies
```

### Running Server

```bash
yarn start
```

### Running Tests

```bash
yarn test
```

### React Fundamentals

#### When Rendering

* No `for` loops, use `.map`:
    ```js
    {
        // Remember that repeated elements must have a 'key' attribute
        ['apple', 'pear', 'carrot'].map((x: string, i) => <h2 key={i}>{x}</h2>)
    }
    ```
* No `if` statement, use `&&`:
    ```js
    // this will only render the 'Yes' element if `isLoaded == true`
    { isLoaded && <h2>Yes!</h2>}
    ```
* No `if`/`else` statements, use a conditional (ternary) operator:
    ```js
    // this will only render the 'Yes' element if `isLoaded == true`, otherwised rendering the 'Nope' element
    { isLoaded ? <h2>Yes!</h2> : <h2>Nope!</h2> }
    ```
