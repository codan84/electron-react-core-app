import { HashRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'

import Main from './pages/main/index'

const App = () => (
  <Router>
    <div>
      <Route path="/main" component={Main} />
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
