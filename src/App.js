import React, { Component } from 'react';
import bg from './pool_table.png';
import './App.css';
import Airport from './Airport.js';

const VIEWPORT = {
    longitude: 18.47,//43793957043837,
    latitude: 54.375,//83427885278863,
    zoom: 14,
    pitch: 20,
    bearing: 25
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: VIEWPORT,
      isToggleOn: true
    };

    this.onViewportChange = this.onViewportChange.bind(this);
  }

  onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  handleHover(info) {
     if(info.object && info.object.properties && info.object.properties.name) {
      document.getElementById("currentElement").innerHTML = info.object.properties.name;
     } else {
      document.getElementById("currentElement").innerHTML = '';
     }
  }

/*
          <Clock />
          <MapMenu viewport={this.state.viewport} onViewportChange={this.onViewportChange} />
          */
  render() {
    let style = {backgroundImage: 'url("' + bg + '")'}
    return (
      <div className="App" style={style}>
        <div className="App-header">
          <h1 className="App-title">Lotnisko</h1>
          <h2 id="currentElement"></h2>
        </div>
        <Airport viewport={this.state.viewport}  onViewportChange={this.onViewportChange} handleHover={this.handleHover}/>
      </div>
    );
  }
}

export default App;
