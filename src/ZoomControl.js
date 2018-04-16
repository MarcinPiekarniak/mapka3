import React, {Component} from 'react';

export default class ZoomControl extends Component {
  constructor(props) {
    super(props);
    this.incZoom = this.incZoom.bind(this);
    this.decZoom = this.decZoom.bind(this);
  }

  incZoom() {
  	this.props.onViewportChange({
  		zoom: this.props.zoom + 1
  	})
  }

  decZoom() {
  	this.props.onViewportChange({
  		zoom: this.props.zoom - 1
  	})
  }

  render() {
  	return (
  	  <div class="zoom-control">
  		<button class="zoom-inc" onClick={this.incZoom}>+</button>
  		<button class="zoom-dec" onClick={this.decZoom}>-</button>
  	  </div>
  	);
  }
}