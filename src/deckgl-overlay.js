import React, {Component} from 'react';
import DeckGL, {experimental} from 'deck.gl';
import MapLayer from './MapLayer.js';
import Root from './Root.js'

const {MapController} = experimental;

const GEOJSON =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'; //eslint-disable-line

const LIGHT_SETTINGS = {
  lightsPosition: [18, 54, 5000, 19, 55, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2
};

export default class DeckGLOverlay extends Component {
  render() {

    if (!this.props.data) {
      return null;
    }

    const layers = this.props.data.filter(layer => layer != null).map(layer => new MapLayer({...layer, handleHover: this.props.handleHover, lightSettings: LIGHT_SETTINGS}));

    return (
        <Root layers={layers}/>
      )
  }
}
