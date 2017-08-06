import React from 'react'

// eslint-disable-next-line react/prefer-stateless-function
class Template extends React.Component {
  render () {
    return (
      <div className="Template">Template</div>
    )
  }
}

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
// Template.propTypes = {
//   prop: React.PropTypes.string,
//   eslint-disable-next-line react/forbid-prop-types
//   shapes: React.PropTypes.array.isRequired
// }

export default Template
