import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { searchRepo, fetchReposIfNeeded } from '../actions'
import SearchBox from '../components/SearchBox'
import Repos from '../components/Repos'

class App extends Component {
  static propTypes = {
    searchedQuery: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, searchedQuery } = this.props
    dispatch(fetchReposIfNeeded(searchedQuery))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchedQuery !== this.props.searchedQuery) {
      const { dispatch, searchedQuery } = nextProps
      dispatch(fetchReposIfNeeded(searchedQuery))
    }
  }

  handleChange = searchQuery => {
    this.props.dispatch(searchRepo(searchQuery))
  }

  render() {
    const { searchedQuery, repos, isFetching, lastUpdated } = this.props
    const isEmpty = repos && repos.length === 0
    return (
      <div>

        <h1>Search Github Repositories</h1>
        <SearchBox value={searchedQuery}
                onChange={this.handleChange} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Repos repos={repos} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { searchedQuery, reposByQuery } = state
  const {
    isFetching,
    lastUpdated,
    items: repos
  } = reposByQuery[searchedQuery] || {
    isFetching: true,
    items: []
  }

  return {
    searchedQuery,
    repos,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
