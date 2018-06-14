const React = require('react')
const PropTypes = require('prop-types')
const api = require('../utils/api')
const Loading = require('./Loading')

function RepoGrid ({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map(({name, owner, html_url, stargazers_count}, index) => {
        return (
          <li key={name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={owner.avatar_url}
                  alt={'Avatar for ' + owner.login} />
              </li>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

// if all your component has is a render method on the react extends class then you can break that out into a function that just returns UI
// this is a stateless functional component
function SelectLanguage ({ onSelect, selectedLanguage }) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className='languages'>
      {languages.map((lang) => {
        return (
          <li
            onClick={() => onSelect(lang)}
            style={lang === selectedLanguage ? {color: '#d0021b'} : null}
            key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

class Popular extends React.Component {
  // use when needing to set initial state of component
  constructor (props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    // makes the this keyword inside updateLanguage, is always the context of updatelanguage and thus keep the context of the component itself, which has setState
    this.updateLanguage = this.updateLanguage.bind(this)
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage (lang) {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    })
    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => ({ repos }))
      })
  }
  render () {
    const { selectedLanguage, repos } = this.state
    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
          ? <Loading />
          : <RepoGrid repos={repos} />}
      </div>
    )
  }
}

Popular.defaultProps = {
  selectedLanguage: 'All'
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

module.exports = Popular
