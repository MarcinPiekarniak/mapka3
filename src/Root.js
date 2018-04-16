/* global window,document,fetch */
import React, {Component} from 'react';
import DeckGL, {experimental} from 'deck.gl';

const {MapController} = experimental;

export default class Root extends Component {
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
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
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
    
    const listProps = Object.keys(object.properties).map(k => <div>{k}: {object.properties[k]}</div>);

    return (
      <div className="tooltip"
           style={{left: x, top: y}}>
        {listProps}
      </div>
    );
  }

  render() {
    const {viewport, width, height} = this.state;

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
          layers={this.props.layers}
          onLayerHover={this._updateTooltip.bind(this)}
        />
      </MapController>
      </div>
    );
  }
}