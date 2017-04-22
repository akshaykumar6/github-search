import { combineReducers } from 'redux'
import {
  SEARCH_QUERY,
  REQUEST_REPOS, RECEIVE_REPOS
} from '../actions'

const searchedQuery = (state = '', action) => {
  switch (action.type) {
    case SEARCH_QUERY:
      return action.searchQuery
    default:
      return state
  }
}

const repos = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_REPOS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_REPOS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.repos,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const reposByQuery = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_REPOS:
    case REQUEST_REPOS:
      return {
        ...state,
        [action.searchQuery]: repos(state[action.searchQuery], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  reposByQuery,
  searchedQuery
})

export default rootReducer
