import DeckGL, {LineLayer} from 'deck.gl';
import {render} from 'react-dom';
import React, {Component} from 'react';

const viewport = {
	  width: 500,
	  height: 500,
	  longitude: 18.443793957043837,
	  latitude: 54.383427885278863,
	  zoom: 13,
	  pitch: 0,
	  bearing: 0
};


const data = [{sourcePosition: [18.443793957043837, 54.383427885278863], targetPosition: [18.443793957043837, 55.0]}];

export default class Map extends Component {
	  render() {
		      return (
				        <DeckGL {...viewport} layers={[
							        new LineLayer({id: 'line-layer', data})
							      ]} />
					      );
		    }
}
