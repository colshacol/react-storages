# react-storages

> Local/Session storage provided via context, reactively.

[![NPM](https://img.shields.io/npm/v/react-storages.svg)](https://www.npmjs.com/package/react-storages) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-storages
```

## Usage

```tsx
import React from 'react'

import { LocalStorage, withLocalStorage, SessionStorage, withSessionStorage } from 'react-storages'

const App = withLocalStorage()(props => {
  setTimeout(() => {
    // Basically, every 7.5 seconds localStorage will be updated,
    // causing this withLocalStorage consumer to rerender and stuff.

    localStorage.setItem("foo", props.storage.foo + "r");
  }, 7500);

  return (
    <div className="App">
      <h1>LocalStorage</h1>
      <h2>foo: {props.storage.foo}</h2>
    </div>
  );
});

const AppContainer = props => {
  return (
    <LocalStorage.Provider>
      <SessionStorage.Provider>
        <App someProp />
      </SessionStorage.Provider>
    </LocalStorage.Provider>
  );
};
```

## License

MIT © [colshacol](https://github.com/colshacol)
