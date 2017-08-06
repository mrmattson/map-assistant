/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import OutputData from './OutputData'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <OutputData
      shapes={[]}
    />, div)
})

it('clean snapshot', () => {
  const component = renderer.create(
    <OutputData
      shapes={[]}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
