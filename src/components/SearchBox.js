import React, { PropTypes } from 'react'

const SearchBox = ({ value, onChange, options }) => (
  <span>
    <input onChange={e => onChange(e.target.value)}
            value={value}>
    </input>
  </span>
)

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SearchBox
