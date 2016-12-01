import React, { PropTypes } from 'react'
import { createReducer } from 'redux-fly'

export const actionPrivateNewGif = (actionPrefix) => `${actionPrefix}/@NEW-GIF`;

const getNewGif = (reduxSetState) => {  
  fetch('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC')
    .then(response => response.json())
    .then(response => reduxSetState('NEW-GIF', { src: response.data.fixed_width_small_still_url }))
    .catch(() => reduxSetState('ERROR-LOADING-NEW-GIF'))
}

const RandomGif = ({ reduxState: { src }, reduxSetState, style = {} }) => (
  <div style={style}>
    <button onClick={() => getNewGif(reduxSetState)}>Get new gif</button>
    <div>
      {src &&      
        <img
          alt="Gif"
          src={src}
          style={{ marginTop: '1rem' }}
        />      
      }
      {!src && <span>&nbsp;</span> }
    </div>
  </div>
)

RandomGif.propTypes = {
  reduxState: PropTypes.object.isRequired,
  reduxSetState: PropTypes.func.isRequired
}

export default createReducer({
  initialState: {
    src: null    
  }
})(RandomGif)

