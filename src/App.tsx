import * as React from 'react';
import { Map } from 'react-arcgis';
import './App.css';

const logo = require('./logo.svg');

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <Map
        className="full-screen-map"
        mapProperties={{ basemap: 'satellite' }}
        onLoad={console.log}
        onFail={console.error}
      />
    </div>
  );
};

export default App;
