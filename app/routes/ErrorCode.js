import React from 'react';
import { connect } from 'react-redux';

class Route extends React.Component {
  render() {
    return (
      <div>
        <p className="text-center text-muted lead">
          <i className="fa fa-warning"></i> An error took place...
        </p>
        <br />
        <p className="text-center text-muted">
          Error Code: <span>{this.props.location.query.code}</span>
        </p>
      </div>
    )
  }
}


export default connect()(Route);
