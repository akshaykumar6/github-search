import React from 'react'
import PropTypes from 'prop-types';


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
