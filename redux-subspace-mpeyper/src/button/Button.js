import React from 'react'
import { connect } from 'react-redux'
import { toggle } from './actions'

const Button = ({ toggled, toggle }) => {
  const style = { backgroundColor: toggled ? "green" : "red", color: "white"}
  
  return (
    <button style={style} onClick={toggle}>Toggle</button>
  )
}

const mapStateToProps = (state) => ({
  toggled: state.toggled
})

const actionCreators = { toggle }

export default connect(mapStateToProps, actionCreators)(Button)
