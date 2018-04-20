import {GeoJsonLayer} from 'deck.gl';

export default class MapLayer extends GeoJsonLayer {
	static layerName = 'MapLayer'

	constructor(props) {
      super({
        id: 'geojson-' + props.file,
        data: props.data,
        opacity: 1,
        stroked: false,
        filled: true,
        extruded: props.extruded || false,
        pickable: props.hover,
        // wireframe: true,
        fp64: true,
        getElevation: f => props.elevation || 0,
        getFillColor: f => props.color || [255, 255, 255],
        getLineColor: f => props.lineColor || [255, 255, 255],
        // lightSettings: LIGHT_SETTINGS,
        // pickable: Boolean(this.props.onHover),
        ...props
      })
	}
}
