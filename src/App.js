import React, { Component } from 'react';
import bg from './pool_table.png';
import './App.css';
import Airport from './Airport.js';

class App extends Component {
  render() {
    let style = {backgroundImage: 'url("' + bg + '")'}
    return (
      <div className="App" style={style}>
        <div className="App-header">
          <h1 className="App-title">Lotnisko</h1>
        </div>
        <Airport />
      </div>
    );
  }
}

export default App;
