import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Popular from './Popular'
import Results from './Results'
// switch
// instead of rendering all the routes it will render only
// one route at a time
// show 404 page if the other routes are not hit
// there is no  so it is active for all other routes
// need to use exact if you're adding pages to that route otherwise
// that page will still be active

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route exact path='/popular' component={Popular} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
