let React = require('react')
let PropTypes = require('prop-types')

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: ''
    }
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
  }

    handleSubmit(id, username) {
      this.setState(() => {
        let newState = {}
        newState[id + 'Name'] = username
        newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
        return newState
      })
    }

  // && is a short hand if statement. It requires both statements to be true to render or return
  render() {
    let playerOneName = this.state.playerOneName
    let playerTwoName = this.state.playerTwoName

    return (
      <div>
        <div className='row'>
          {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}
          />}
          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit}
          />}
        </div>
      </div>
    )
  }
}

module.exports = Battle
