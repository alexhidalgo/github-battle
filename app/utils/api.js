import axios from 'axios'
const id = 'clientID'
const sec = 'secrediDA'
const params = `?client_id=${id}&client_secret=${sec}`

// DONE object literals
// DONE destructuring
// DONE arrow functions
  // implicit returns + one line
  // remove function keyword
// DONE default parameters
// DONE var, let, const
// NOTHING shorthand method names
// NOTHING computed property names

async function getProfile (username) {
  try {
    const results = await axios.get(`https://api.github.com/users/${username}${params}`)
    return results.data
  } catch (error) {
    console.error(error)
  }
}

async function getRepos (username) {
  try {
    const results = axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    return results
  } catch (error) {
    console.error(error)
  }
}

function getStarCount (repos) {
  try {
    const results = repos.data.reduce((count, { stargazers_count }) => (count + stargazers_count), 0)
    return results
  } catch (error) {
    console.error(error)
  }
}

function calculateScore ({ followers }, repos) {
  return (followers * 3) + getStarCount(repos)
}

function handleError (error) {
  console.warn(error)
  return null
}

function getUserData (player) {
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(([ profile, repos ]) => ({
    profile, score: calculateScore(profile, repos)
  }))
}

function sortPlayers (players) {
  return players.sort((a, b) => b.score - a.score
  )
}

export function battle (players) {
  return Promise.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError)
}

export function fetchPopularRepos (language = 'all') {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  return axios.get(encodedURI).then(({ data }) => data.items)
}
