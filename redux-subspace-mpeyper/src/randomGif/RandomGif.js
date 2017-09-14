import React from 'react'
import { connect } from 'react-redux'
import { getGif } from './actions'

const RandomGif = ({ loading, src, getGif }) => (
  <div style={{ width: '100px' }}>
    <button onClick={getGif} disabled={loading}>{ loading ? "Loading..." : "Get Gif" }</button>
    { src && <div><img alt="Gif" src={src} style={{ marginTop: '5px' }} /></div> }
  </div>
)

const mapStateToProps = (state) => ({
    loading: state.loading,
    src: state.src
})
  
const actionCreators = { getGif }

export default connect(mapStateToProps, actionCreators)(RandomGif)
