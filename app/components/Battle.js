const React = require('react')
const PropTypes = require('prop-types')
const Link = require('react-router-dom').Link
const PlayerPreview = require('./PlayerPreview')

class PlayerInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { username: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    // prevents default behavior of submitting to server
    event.preventDefault()

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }
  handleChange (event) {
    const value = event.target.value
    this.setState(() => ({ username: value }))
  }
  // the form has a standard html property called onSubmit which is triggered
  // when the type 'submit' button is triggered. When triggered it calls the function
  // handleSubmit which calls a function that was passed down from the parent
  // called onSubmit. This func updates the state and calls setState.
  render () {
    const { username } = this.state
    const { label } = this.props
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!username}>
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
  constructor (props) {
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

  handleSubmit (id, username) {
    this.setState(() => ({
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`
    }))
  }

  handleReset (id) {
    this.setState(() => ({
      [id + 'Name']: '',
      [id + 'Image']: null
    }))
  }

  // && is a short hand if statement. It requires both statements to be true to render or return
  render () {
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state
    const { match } = this.props

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
            >
              <button className='reset'
                onClick={() => { this.handleReset('playerOne') }}>
                Reset
              </button>
            </PlayerPreview>}

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
              id='playerTwo'
            >
              <button className='reset'
                onClick={() => { this.handleReset('playerTwo') }}>
                Reset
              </button>
            </PlayerPreview>}
        </div>
        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
            Battle
          </Link>}
      </div>
    )
  }
}

module.exports = Battle
