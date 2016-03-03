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

function clicker() {
  alert("Hi!")
}

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
      count: this.state.count + 1,
      alertMessage: "Incremented!"
    })

    var self = this;

    setTimeout(function() {
      self.setState({
        alertMessage: null
      })
    }, 3000)

  }

  decrement() {
    this.setState({
      count: this.state.count - 1,
      alertMessage: "Decremented!"
    })
  }

  render() {

    var alert = (<div className="alert alert-danger">{this.state.alertMessage}</div>)

    if(!this.state.alertMessage) {
      alert = null;
    }

    var template = (
      <div>
        <div>You have clicked: {this.state.count} times.</div>
        {alert}
        <button onClick={this.increment.bind(this)}>Increment</button>
        <button onClick={this.decrement.bind(this)}>Decrement</button>
      </div>
    )

    return template;

    /*
    var items = [
      <li>A</li>,
      <li>B</li>,
      <li>C</li>
    ]

    if(Math.random() < 0.5) {
      template = (
        <div>Empty! Sucker!</div>
      )
    }

    return (
      <div>
        This is a clicker!
        <br/>
        {template}
        <br/>
        <ul>
          {items}
        </ul>
        <hr/>
      </div>
    );
    */
  }
}

class Header extends React.Component {

  render() {
    var title = this.props.title;
    if(this.props.monkey) {
      title += " is a monkey"
    }

    return (
      <div>
        <h1>{title}</h1>
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
    return (
      <div>
        <div className="container">
          <Header title="Clicker App" />
          <Clicker initialCount={Math.floor(Math.random() * 50)} />
          <br/>
          <Clicker />
          <br/>
          <Clicker />
          <br/>
          <Clicker />

          <hr/>

          <h2>Dynamic List</h2>

          {this.state.clickers}

          <hr/>

          <button onClick={this.add.bind(this)} >Add Clicker</button>
        </div>
      </div>
    )
  }
}

export default connect()(Home)
