/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import ShapeEditList from './ShapeEditList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ShapeEditList
      draftShapes={[]}
      selectedDraftShapes={[]}
      saveShapesAsFinal={function saveShapesAsFinal () { return 0 }}
      onSelectionChange={function onSelectionChange () { return 0 }}
      onPropertyChange={function onPropertyChange () { return 0 }}
    />, div)
})

it('clean snapshot', () => {
  const component = renderer.create(
    <ShapeEditList
      draftShapes={[]}
      selectedDraftShapes={[]}
      saveShapesAsFinal={function saveShapesAsFinal () { return 0 }}
      onSelectionChange={function onSelectionChange () { return 0 }}
      onPropertyChange={function onPropertyChange () { return 0 }}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
