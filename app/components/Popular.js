var React = require('react');
var PropTypes = require('prop-types')
var api = require('../utils/api')


function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
        <li key={repo.name} className='popular-item'>
          <div className='popular-rank'>#{index + 1}</div>
          <ul className='space-list-items'>
            <li>
              <img
                className='avatar'
                src={repo.owner.avatar.url}
                alt={'Avatar for ' + repo.owner.login}/>
            </li>
            <li><a href={repo.html_url}>{repo.name}</a></li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
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
function SelectLanguage (props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
    {languages.map((lang) => {
      return (
        <li
          onClick={props.onSelect.bind(null, lang)}
          style={lang === props.selectedLanguage ? {color: '#d0021b'}: null}
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
    constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    // makes the this keyword inside updateLanguage, is always the context of updatelanguage and thus keep the context of the component itself, which has setState
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage(lang) {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    })
    api.fetchPopularRepos(lang)
    .then((repos) => {
      this.setState(() => {
        return {
          repos: repos
        }
      })
    })
  }
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
        ? <p>loading...</p>
        : <RepoGrid repos={this.state.repos} />}
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

module.exports = Popular;
