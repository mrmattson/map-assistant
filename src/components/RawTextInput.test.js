/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import RawTextInput from './RawTextInput'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <RawTextInput
      rawText="rawText"
      onRawTextChange={function onRawTextChange () {}}
      processRawText={function processRawText () {}}
    />, div)
})

it('clean snapshot', () => {
  const component = renderer.create(
    <RawTextInput
      rawText="rawText"
      onRawTextChange={function onRawTextChange () {}}
      processRawText={function processRawText () {}}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
