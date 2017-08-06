/* eslint-env jest */

import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import GeoShapes from './GeoShapes'
import shapeMapApp from '../reducers'

const store = createStore(shapeMapApp)

it('renders without crashing', () => {
  mount(
    <Provider store={store}>
      <GeoShapes />
    </Provider>
  )
})

it('default state snapshot', () => {
  const component = renderer.create(
    <Provider store={store}>
      <GeoShapes />
    </Provider>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
