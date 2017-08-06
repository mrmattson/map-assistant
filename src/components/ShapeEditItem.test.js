/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import ShapeEditItem from './ShapeEditItem'

const draftShapeExample = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [[[0, 1], [1, 0], [1, 1], [0, 1]]]
  },
  id: 'abcdefg',
  properties: {
    id: 'abcdefg',
    shape: 'Circle',
    title: '',
    description: '',
    stroke: '#000000',
    'stroke-width': 1,
    fill: '#000000',
    'fill-opacity': 0.5,
    radius: 1,
    radiusUnits: 'nauticalMiles',
    numSides: 12,
    centerCoordinates: [0, 1]
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ShapeEditItem
      index={2}
      draftShape={draftShapeExample}
      selectedDraftShapes={[]}
      onSelectionChange={function onSelectionChange () { return 0 }}
      onPropertyChange={function onPropertyChange () { return 0 }}
    />,
    div
  )
})

it('clean snapshot', () => {
  const component = renderer.create(
    <ShapeEditItem
      index={2}
      draftShape={draftShapeExample}
      selectedDraftShapes={[]}
      onSelectionChange={function onSelectionChange () { return 0 }}
      onPropertyChange={function onPropertyChange () { return 0 }}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
