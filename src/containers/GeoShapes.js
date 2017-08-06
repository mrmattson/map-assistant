import React from 'react'
import VisibleMapView from './VisibleMapView'
import VisibleRawTextInput from './VisibleRawTextInput'
import VisibleShapeList from './VisibleShapeList'
import VisibleShapeEditList from './VisibleShapeEditList'
import VisibleOutputData from './VisibleOutputData'

export default function GeoShapes () {
  return (
    <div className="GeoShapes">
      <div className="row">
        <div className="col-md-4">
          <VisibleRawTextInput />
          <VisibleShapeEditList />
          <VisibleShapeList />
          <VisibleOutputData />
        </div>
        <div className="col-md-8">
          <VisibleMapView />
        </div>
      </div>
    </div>
  )
}
