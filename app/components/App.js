let React = require('react')
let Popular = require('./Popular')
let ReactRouter = require ('react-router-dom')
let Router = ReactRouter.BrowserRouter
let Route = ReactRouter.Route
let Switch = ReactRouter.Switch
let Nav = require('./Nav')
let Home = require('./Home')
let Battle = require('./Battle')

// switch
// instead of rendering all the routes it will render only
// one route at a time
// show 404 page if the other routes are not hit
// there is no path so it is active for all other routes
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
                <Route exact path='/popular' component={Popular} />
                <Route render={() => {
                    return <p>Not Found</p>
                  }} />
              </Switch>

            </div>
          </Router>
        )
    }
}

module.exports = App
