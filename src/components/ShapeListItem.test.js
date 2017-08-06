/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import ShapeListItem from './ShapeListItem'

import example from '../TestData/circles'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ShapeListItem
      shape={example.circlePolygon}
    />, div)
})

it('clean snapshot', () => {
  const component = renderer.create(
    <ShapeListItem
      shape={{
        properties: {
          title: 'None',
          centerCoordinates: [0, 0],
          radius: 1,
          radiusUnits: 'units'
        }
      }}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('example circle polygon snapshot', () => {
  const component = renderer.create(
    <ShapeListItem
      shape={example.circlePolygon}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
