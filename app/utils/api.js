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
  const results = await axios.get(`https://api.github.com/users/${username}${params}`)
  return results.data
}

async function getRepos (username) {
  const results = axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
  return results
}

function getStarCount (repos) {
  return repos.data.reduce((count, { stargazers_count }) => (count + stargazers_count), 0)
}

function calculateScore ({ followers }, repos) {
  return (followers * 3) + getStarCount(repos)
}

function handleError (error) {
  console.warn(error)
  return null
}

async function getUserData (player) {
  const profile = await getProfile(player)
  const repos = await getRepos(player)
  return {
    profile,
    score: calculateScore(profile, repos)
  }
}

function sortPlayers (players) {
  return players.sort((a, b) => b.score - a.score
  )
}

export async function battle (players) {
  const results = await Promise.all(players.map(getUserData))
    .catch(handleError)
  return results === null
    ? results
    : sortPlayers(results)
}

export async function fetchPopularRepos (language = 'all') {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  const repos = await axios.get(encodedURI)
    .catch(handleError)
  return repos.data.items
}
