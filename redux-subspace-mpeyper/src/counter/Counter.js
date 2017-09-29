import React from 'react'
import { connect } from 'react-redux'

const Counter = ({ count }) => (
    <p>Counter: {count}</p>
)

const mapStateToProps = (state) => ({
    count: state.count
})

export default connect(mapStateToProps)(Counter)
