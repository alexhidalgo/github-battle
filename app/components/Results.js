let React = require('react')
let queryString = require('query-string')
let api = require('../utils/api')
let Link = require('react-router-dom').Link

class Results extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount () {
    let players = queryString.parse(this.props.location.search)

    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then((results) => {
      if (results === null) {
        this.setState(() => {
          return {
            error: 'Looks like an error. Check that both users exist on Github :)',
            loading: false
          }
        })
      } else {
        this.setState(() => {
          return {
            error: null,
            winner: results[0],
            loser: results[1],
            loading: false
          }
        })
      }
    })
  }
  render () {
    let error = this.state.error
    let winner = this.state.winner
    let loser = this.state.loser
    let loading = this.state.loading

    if (loading === true) {
      return <p>Loading...</p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }
    return (
      <div>
        <div>{JSON.stringify(this.state, null, 2)}</div>
      </div>
    )
  }
}

module.exports = Results
