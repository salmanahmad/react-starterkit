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

class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.initialCount || 0,
      alertMessage: null
    }
  }

  increment() {
    this.setState({
      count: this.state.count + 1
    })
  }

  decrement() {
    this.setState({
      count: this.state.count - 1
    })
  }

  render() {
    var template = (
      <div>
        <div>You have clicked: {this.state.count} times.</div>
        <button onClick={this.increment.bind(this)}>Increment</button>
        <button onClick={this.decrement.bind(this)}>Decrement</button>
      </div>
    )

    return template;
  }
}

class Header extends React.Component {

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </div>
    )
  }
}


class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      clickers: []
    }
  }

  add() {
    var clickers = this.state.clickers
    clickers.push((<Clicker />))
    this.setState({
      clickers: clickers
    })
  }

  render() {

    var clickers = this.state.clickers.map(clicker => (
      <div>
        {clicker}
        <br/>
      </div>
    ))

    return (
      <div>
        <div className="container">
          <Header title="Clicker App" />
          <Clicker initialCount={11} />
          <br/>
          <Clicker />
          <br/>
          <Clicker />
          <br/>
          <Clicker />

          <hr/>

          <h2>Dynamic List</h2>
          <p>
            <button onClick={this.add.bind(this)} >Add Clicker</button>
          </p>
          <br/>

          {clickers}

        </div>
      </div>
    )
  }
}

export default connect()(Home)
