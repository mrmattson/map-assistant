/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import MapPopup from './MapPopup'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MapPopup
      uniqueId="abc"
      text="def"
    />, div)
})

it('clean snapshot', () => {
  const component = renderer.create(
    <MapPopup
      uniqueId="abc"
      text="def"
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
