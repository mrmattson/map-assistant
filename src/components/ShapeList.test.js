/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import ShapeList from './ShapeList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ShapeList
      shapes={[]}
    />, div)
})

it('clean snapshot', () => {
  const component = renderer.create(
    <ShapeList
      shapes={[]}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
