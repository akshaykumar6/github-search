import React, { PropTypes } from 'react'

const Repos = ({repos}) => (
  <ul>
    {repos.map((repo, i) =>
      <li key={i}>
      	<a href={repo.html_url} target="_blank">
      		<h3>{repo.full_name}</h3>
      	</a>
      	<label>
      		<span>Stars : {repo.stargazers_count}</span>
      	</label>
      	<p>
      		{repo.description}
      	</p>
        <label>
      		By 
          <a href={repo.owner.html_url} title={repo.owner.login} target="_blank">
            {repo.owner.login}
          </a>
          <img height="20" width="20" src={repo.owner.avatar_url} alt=""></img>
          
      	</label>
      </li>
    )}
  </ul>
)

Repos.propTypes = {
  repos: PropTypes.array.isRequired
}

export default Repos