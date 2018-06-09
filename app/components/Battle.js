let React = require('react')
let PropTypes = require('prop-types')
let Link = require('react-router-dom').Link

function PlayerPreview (props) {
  return (
    <div>
      <div className='column'>
        <img className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
          />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button className='reset'
        onClick={props.onReset.bind(null, props.id)}>
        Reset
      </button>
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    // prevents default behavior of submitting to server
      event.preventDefault()

      this.props.onSubmit(
        this.props.id,
        this.state.username
      )
  }
  handleChange(event) {
    let value = event.target.value
    this.setState(() => {
      return {
        username: value
      }
    })
  }
// the form has a standard html property called onSubmit which is triggered
// when the type 'submit' button is triggered. When triggered it calls the function
// handleSubmit which calls a function that was passed down from the parent
// called onSubmit. This func updates the state and calls setState.
  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

    handleSubmit(id, username) {
      this.setState(() => {
        let newState = {}
        newState[id + 'Name'] = username
        newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
        return newState
      })
    }

    handleReset(id) {
        this.setState(()=> {
          let newState = {}
          newState[id + 'Name'] = ''
          newState[id + 'Image'] = null
          return newState
        })
    }

  // && is a short hand if statement. It requires both statements to be true to render or return
  render() {
    let playerOneName = this.state.playerOneName
    let playerTwoName = this.state.playerTwoName
    let playerOneImage = this.state.playerOneImage
    let playerTwoImage = this.state.playerTwoImage
    let match = this.props.match

    return (
      <div>
        <div className='row'>
          {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}
          />}

          {playerOneImage !== null &&
          <PlayerPreview
            avatar={playerOneImage}
            username={playerOneName}
            onReset={this.handleReset}
            id='playerOne'
          />}

          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit}
          />}

          {playerTwoImage !== null &&
          <PlayerPreview
            avatar={playerTwoImage}
            username={playerTwoName}
            onReset={this.handleReset}
            id='playerTwo'
          />}
        </div>
        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: `?playerOneName=` + playerOneName + '&playerTwoName=' +
                playerTwoName
            }}>
          Battle
        </Link>}
      </div>
    )
  }
}

module.exports = Battle
