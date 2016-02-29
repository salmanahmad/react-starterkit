import React from 'react'
import { Route } from 'react-router'

import App from 'routes/App'
import Home from 'routes/Home'
import ErrorCode from 'routes/ErrorCode'

export default (
  <Route path="/" component={App}>
    <Route path="home" component={Home} />
    <Route path="error" component={ErrorCode} />
  </Route>
)
