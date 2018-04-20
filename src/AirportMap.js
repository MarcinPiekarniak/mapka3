import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer, experimental} from 'deck.gl';

const {MapController} = experimental;

export default class AirportMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 54.3792,
        longitude: 18.468,
        zoom: 16,
        bearing: 24,
        pitch: 20
      },
      tooltip: {
      	x: 0,
      	y: 0,
      	object: null
      },
      width: 500,
      height: 500,
      car: {
        lat: 54.3792,
        lng: 18.468
      }
    };

    // this.moveCar = this.moveCar.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    window.addEventListener('keydown', this.moveCar.bind(this), true);
    this._resize();
  }

  _resize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _updateTooltip(info) {
  	if (info) {
  		const {x, y, object} = info;
    	this.setState({tooltip: {x, y, object}});
    } else {
    	this.setState({tooltip: {x: 0, y: 0, object: null}});
    }
  }

  _renderTooltip() {
  	const {x, y, object} = this.state.tooltip;

    if (!object) {
      return null;
    }
    
    const listProps = Object.keys(object.properties).map(k => <div key={k}>{k}: {object.properties[k]}</div>);

    return (
      <div className="tooltip"
           style={{left: x, top: y}}>
        {listProps}
      </div>
    );
  }

  // left = 37
  // up = 38
  // right = 39
  // down = 40
  moveCar(e) {
    const precision = 0.00004,
    	  deg = this.state.viewport.bearing,
    	  cos = Math.cos(deg * Math.PI / 180),
    	  sin = Math.sin(deg * Math.PI / 180);
    let dlat = 0, dlng = 0;

    switch(e.key) {
      case 'a':
        dlat = sin;
        dlng = -cos;
        break;
      case 'w':
        dlat = cos;
        dlng = sin;
        break;
      case 'd':
        dlat = -sin;
        dlng = cos;
        break;
      case 's':
        dlat = -cos;
        dlng = -sin;
        break;
      default:
        return {};
    };

    console.log("moving...");
    this.setState(prevState => {
      return {
        car: {
          lat: prevState.car.lat + dlat * precision,
          lng: prevState.car.lng + dlng * precision
        }
      }});
  }

  render() {
    const {viewport, width, height} = this.state;

    let allLayers = this.props.layers.slice(0);
    allLayers.push(new ScatterplotLayer({
      id: "car layer",
      data: [{
        position: [this.state.car.lng, this.state.car.lat],
        radius: 5,
        color: [70, 70, 255]
      }],
      outline: false
    }));

    return (<div>
      {this._renderTooltip()}
      <MapController
        {...viewport}
        width={width}
        height={height}
        onViewportChange={v => this.setState({viewport: v})}
      >
        <DeckGL
          {...viewport}
          width={width}
          height={height}
          layers={allLayers}
          onLayerHover={this._updateTooltip.bind(this)}
        />
      </MapController>
      </div>
    );
  }
}