import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

class Route extends React.Component {
  componentDidMount() {
    this.props.dispatch(pushState(null, '/home'))
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

function selector(state) {
  return state;
}

export default connect(selector)(Route)
