/* eslint-env jest */

import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import MapView from './MapView'

it('renders without crashing', () => {
  mount(
    <MapView
      draftShapes={[]}
      shapes={[]}
      suggestCoordinate={function suggestCoordinate () {}}
    />
  )
})

it('clean snapshot', () => {
  const component = renderer.create(
    <MapView
      draftShapes={[]}
      shapes={[]}
      suggestCoordinate={function suggestCoordinate () {}}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
