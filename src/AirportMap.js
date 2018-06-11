import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer, experimental} from 'deck.gl';

const {MapController} = experimental;

export default class AirportMap extends Component {
  constructor(props) {
    super(props);
  	this.vId = 0;
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
      	object: null,
      	layer: null
      },
      infowindow: {
      	object: null,
      	layer: null
      },
      width: 500,
      height: 500,
      car: {
        lat: 54.3792,
        lng: 18.468
      },
      vehicles: (new Array(1000)).fill(null).map(() => ({
            		position: [18.468 + 0.01 * (Math.random() > 0.5 ? Math.random() : -Math.random()),
            			54.3792 + 0.002 * (Math.random() > 0.5 ? Math.random() : -Math.random())],
            		bearing: Math.floor(360 * Math.random()),
            		speed: 0.000002 + 0.000002 * Math.random(),
            		id: ++this.vId
	  }))
    };

    // this.moveCar = this.moveCar.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    window.addEventListener('keydown', this.moveCar.bind(this), true);
    this.timerID = setInterval(
      () => this._updateVehiclesPositions(),
      80
    );
    this._resize();
  }

  componentWillUnmount() {
  	clearInterval(this.timerID);
  }

  _resize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _updateTooltip(info) {
  	if (info) {
  		const {x, y, object, layer} = info;
		this.setState({tooltip: {x, y, object, layer}});
    } else {
    	this.setState({tooltip: {x: 0, y: 0, object: null, layer: null}});
    }
  }

  _updateInfoWindow(info) {
  	if (info) {
  		const {object, layer} = info;
		this.setState({infowindow: {object, layer}});
    } else {
    	this.setState({infowindow: {object: null, layer: null}});
    }	
  }

  _getObjectInfo(object) {
  	return Object.keys(object).map(k => <div key={k}>{k}: {object[k]}</div>);
  }

  _renderTooltip() {
  	const {x, y, object, layer} = this.state.tooltip;

    if (!object || !layer) {
      return null;
    }

	let info = layer.id === "vehicles layer" ? this._getObjectInfo(object) : this._getObjectInfo(object.properties);

	return (
      <div className="tooltip"
           style={{left: x, top: y}}>
        {info}
      </div>
    );
    
  }

  _renderInfoWindow() {
  	const {object, layer} = this.state.infowindow;

    if (!object || !layer) {
      return null;
    }

  	let info = layer.id === "vehicles layer" ? this._getObjectInfo(object) : this._getObjectInfo(object.properties);
  	return (
      <div className="infowindow">
        {info}
      </div>
    );
  }

  _updateVehiclesPositions() {
  	this.setState(prevState => {
  		const newVehicles =  prevState.vehicles.map(v => ({
  			position: [
  				v.position[0] + v.speed * Math.cos(v.bearing * Math.PI / 180),
  				v.position[1] + v.speed * Math.sin(v.bearing * Math.PI / 180)
  			],
  			bearing: v.bearing,
  			speed: v.speed,
  			id: v.id
  		}))

  		let newObject = prevState.infowindow.object;
  		if (prevState.infowindow && prevState.infowindow.layer && prevState.infowindow.layer.id === "vehicles layer" && prevState.infowindow.object && prevState.infowindow.object.id) {
  			newObject = newVehicles.filter(v => v.id === prevState.infowindow.object.id).slice(-1)[0];
  			if(!newObject) {
  				newObject = prevState.infowindow.object;
  			}
  		}

  		return {
  			vehicles: newVehicles,
  			infowindow: {
  				...prevState.infowindow,
  				object: newObject
  			}
  		}
  	});
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
    allLayers.push(new ScatterplotLayer({
      id: "vehicles layer",
      data: this.state.vehicles.map(v => ({
        radius: 1,
        color: [70, 70, 255],
        ...v
      })),
      outline: false,
      fp64: true,
      pickable: true,
      transitions: {
      	getPositions: 80
      }
    }));

    return (<div>
      {this._renderTooltip()}
      {this._renderInfoWindow()}
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
          onLayerClick={this._updateInfoWindow.bind(this)}
        />
      </MapController>
      </div>
    );
  }
}