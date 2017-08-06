/* eslint-disable quotes */

import React from 'react'
import PropTypes from 'prop-types'
import 'openlayers/dist/ol-debug.css'
import ol from 'openlayers/dist/ol-debug'
import turfHelpers from '@turf/helpers'
import turfBbox from '@turf/bbox'

import R from 'ramda'

import MapPopup from '../components/MapPopup'

const DEFAULT_MAP_CENTER = [-94.5786, 39.0997]
const DEFAULT_ZOOM_LEVEL = 9
const WGS84_PROJECTION = 'EPSG:4326'
const ZOOM_DURATION = 50

class MapView extends React.Component {
  // FIX this createStringHDMS is all messed up
  createStringHDMS (optFractionDigits) {
    return function createStringHDMSInternal (coordinate) {
      return ol.coordinate.toStringHDMS(coordinate, optFractionDigits)
    }
  }

  // FIX this should be a React components
  createPopupElements (shapes) {
    const htmlAttrs = R.map((shape) => {
      const elementAttrs = {
        id: shape.properties.id,
        text: shape.properties.title
      }
      return elementAttrs
    }, shapes)
    return htmlAttrs
  }

  constructor (props) {
    super(props)

    // Binding
    this.handleClickEvent = this.handleClickEvent.bind(this)
    this.createStringHDMS = this.createStringHDMS.bind(this)

    // Defaults
    this.defaultStyle = {
      color: '#000000',
      width: 4,
      lineDash: [1, 5]
    }
  }

  componentDidMount () {
    this.createMap()
  }

  componentDidUpdate () {
    this.updateMap()
  }

  createMap () {
    // Set up map
    const mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: this.createStringHDMS(1),
      projection: 'EPSG:4326',
      undefinedHTML: '&nbsp;'
    })

    this.map = new ol.Map({
      controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
          collapsible: false
        })
      }).extend([mousePositionControl]),
      interactions: ol.interaction.defaults({
        mouseWheelZoom: false
      }),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: DEFAULT_MAP_CENTER,
        projection: WGS84_PROJECTION,
        zoom: DEFAULT_ZOOM_LEVEL
      }),
      target: this.mapElement
    })

    // Event binding
    this.map.on('click', this.handleClickEvent)

    this.updateMap()
  }

  updateMap () {
    if (this.vectorLayer) {
      this.map.removeLayer(this.vectorLayer)
    }

    if (this.draftVectorLayer) {
      this.map.removeLayer(this.draftVectorLayer)
    }

    // Add features and styles
    this.vectorLayer = this.generateVectorLayer()
    this.map.addLayer(this.vectorLayer)
    this.draftVectorLayer = this.generateDraftVectorLayer()
    this.map.addLayer(this.draftVectorLayer)

    // Center map
    const { shapes, draftShapes } = this.props
    const featCollect = turfHelpers.featureCollection(R.concat(shapes, draftShapes))
    if (featCollect.features.length === 0) {
      this.map.getView().setCenter(DEFAULT_MAP_CENTER)
    } else {
      this.map.getView().fit(turfBbox(featCollect), {
        padding: [25, 25, 25, 25],
        constrainResolution: false,
        duration: ZOOM_DURATION
      })
    }

    // Wrangle in map popups
    this.relocatePopupElements(this.vectorLayer)
    this.relocatePopupElements(this.draftVectorLayer)
  }

  handleClickEvent (event) {
    this.props.suggestCoordinate(event.coordinate)
  }

  generateVectorLayer () {
    const { shapes } = this.props
    const featureCollection = turfHelpers.featureCollection(shapes)

    const source = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(featureCollection)
    })
    const style = this.decodeStyles(shapes)
    const vectorLayer = new ol.layer.Vector({
      source,
      style
    })

    return vectorLayer
  }

  generateDraftVectorLayer () {
    const { draftShapes } = this.props
    const featureCollection = turfHelpers.featureCollection(draftShapes)

    const source = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(featureCollection)
    })
    const emptyPropertiesObjects = R.map(draftShape => ({ properties: {} }), draftShapes)
    const style = this.decodeStyles(emptyPropertiesObjects)
    const vectorLayer = new ol.layer.Vector({
      source,
      style
    })

    return vectorLayer
  }

  decodeStyles (shapes) {
    return shapes.map((shape) => {
      let color = this.defaultStyle.color
      let lineDash = this.defaultStyle.lineDash

      if (shape.properties.stroke) {
        color = shape.properties.stroke
        lineDash = undefined  // solid
      }

      return new ol.style.Style({
        stroke: new ol.style.Stroke({
          color,
          lineDash,
          width: this.defaultStyle.width
        })
      })
    })
  }

  relocatePopupElements (vectorLayer) {
    // Move popup elements to their location on the map
    const features = vectorLayer.getSource().getFeatures()

    features.map(feature => this.map.addOverlay(new ol.Overlay({
      position: feature.get('centerCoordinates'),
      element: document.getElementById(feature.getId())
    })))
  }

  render () {
    const { draftShapes, shapes } = this.props
    // FIX 'popups' is not a clear variable name, nor is this procedure clear
    const popups = R.concat(this.createPopupElements(shapes), this.createPopupElements(draftShapes))
    const popupsEls = popups.map(el => (<MapPopup key={el.id} uniqueId={el.id} text={el.text} />))

    return (
      <div>
        <div className="MapView-map" ref={map => (this.mapElement = map)} />
        {popupsEls}
      </div>
    )
  }
}

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
MapView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  shapes: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  draftShapes: PropTypes.array.isRequired,
  suggestCoordinate: PropTypes.func.isRequired
}

export default MapView
