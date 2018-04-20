import React, {Component} from 'react';
import {json as requestJson} from 'd3-request';
import LAYER_CONFIGS from './layer-configs.js';
import AirportMap from './AirportMap.js';
import MapLayer from './MapLayer.js';
import {PolygonLayer} from 'deck.gl'

const DATA_PREFIX = './data/';

const LIGHT_SETTINGS = {
  lightsPosition: [18, 54, 5000, 19, 55, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2
};

export default class Airport extends Component {
	constructor(props) {
    super(props);
    this.state = {
      data: new Array(LAYER_CONFIGS.length)
    };

    LAYER_CONFIGS.forEach((layer, index) =>
      requestJson(DATA_PREFIX + layer.file, (error, response) => {
        if (!error) {
          this.setState(prevState => {
            let newData = prevState.data;
            newData[index] = {
              ...layer,
              data: response
            }
            return {
              data: newData
            }
          });
        }
      }), this);
  }

  render() {
    let layers = this.state.data.filter(layer => layer != null).map(layer => new MapLayer({...layer, lightSettings: LIGHT_SETTINGS}));
      
    return (
      <AirportMap layers={layers} />
    );
  }
}
