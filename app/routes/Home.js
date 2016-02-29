import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import Immutable from 'immutable'
import config from 'config'

import moment from 'moment'
import fetch from 'isomorphic-fetch';
import lodash from 'lodash';

class Route extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
      records: Immutable.Map()
    }
  }

  render() {
    return (
      <div>
        Hello, World!
      </div>
    )
  }
}

export default connect()(Route)
