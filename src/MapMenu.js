import React, {Component} from 'react';
import ZoomControl from './ZoomControl.js';

export default class MapMenu extends Component {

  render() {
  	return(
      <div id="map-menu">
        <ZoomControl zoom={this.props.viewport.zoom} onViewportChange={this.props.onViewportChange}/>
      </div>
    )
  }
}