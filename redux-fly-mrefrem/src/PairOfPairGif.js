import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RandomGif from './RandomGif'

const gifStyle = { float: 'left', marginRight: '20px' }
const needGetGifAction = 'pairOfPairGif/NEED-GET-GIF'

const PairOfPairGif = ({ reduxActionPrefix, dispatch }) => (
  <div>
    <RandomGif
      reduxMountPath="pairOfPair firstPairGifs first"
      style={gifStyle}
      reduxActionPrefix={reduxActionPrefix}
      needGetGifAction={needGetGifAction}
    />
    <RandomGif
      reduxMountPath="pairOfPair firstPairGifs second"
      style={gifStyle}
      reduxActionPrefix={reduxActionPrefix}
      needGetGifAction={needGetGifAction}
    />
    <RandomGif
      reduxMountPath="pairOfPair secondPairGifs first"
      style={gifStyle}
      reduxActionPrefix={reduxActionPrefix}
      needGetGifAction={needGetGifAction}
    />
    <RandomGif
      reduxMountPath="pairOfPair secondPairGifs second"
      reduxActionPrefix={reduxActionPrefix}
      needGetGifAction={needGetGifAction}
    />

    <div style={{ clear: 'both' }}>
      <button onClick={() => dispatch({ type: needGetGifAction })}>
        Get all gifs
      </button>
    </div>
  </div>
)

PairOfPairGif.propTypes = {
  reduxActionPrefix: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(PairOfPairGif)
