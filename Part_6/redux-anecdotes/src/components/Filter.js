import React from 'react'
import { connect } from 'react-redux'
import { settingFilter } from '../reducers/filterReducer'

const Filter = (props) => {
      const style = {
        marginBottom: 10
      }
    
      return (
        <div style={style}>
          filter <input onChange={(e) =>props.settingFilter(e.target.value) } />
        </div>
      )
    }

export default connect(
  null,
  { settingFilter }
)(Filter)