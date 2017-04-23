export const REQUEST_REPOS = 'REQUEST_REPOS'
export const RECEIVE_REPOS = 'RECEIVE_REPOS'
export const SEARCH_QUERY = 'SEARCH_QUERY'

export const searchRepo = searchQuery => ({
  type: SEARCH_QUERY,
  searchQuery
})

export const requestRepos = searchQuery => ({
  type: REQUEST_REPOS,
  searchQuery
})

export const receiveRepos = (searchQuery, json) => ({
  type: RECEIVE_REPOS,
  searchQuery,
  repos: json.items,
  receivedAt: Date.now()
})

const fetchRepos = searchQuery => dispatch => {
  dispatch(requestRepos(searchQuery))
  let query = searchQuery
  if (searchQuery.length == 0) {
    query = "stars:%3E10000+language:javascript"
  }

  let githubapi = "https://api.github.com/search/repositories?q="+query+"&sort=stars&order=desc"
  return fetch(githubapi)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveRepos(searchQuery, json))
    })
}

const shouldFetchRepos = (state, searchQuery) => {
  const repos = state.reposByQuery[searchQuery]
  if (!repos) {
    return true
  }
  if (repos.isFetching) {
    return false
  }
  return repos.didInvalidate
}

export const fetchReposIfNeeded = searchQuery => (dispatch, getState) => {
  if (shouldFetchRepos(getState(), searchQuery)) {
    return dispatch(fetchRepos(searchQuery))
  }
}
