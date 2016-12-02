import React, { PropTypes } from 'react'
import { createReducer } from 'redux-fly'

export const actionPrivateNewGif = (actionPrefix) => `${actionPrefix}/@NEW-GIF`

class RandomGif extends React.Component {
  static propTypes = {
    reduxState: PropTypes.object.isRequired,
    reduxSetState: PropTypes.func.isRequired,    
    reduxActionPrefix: PropTypes.string.isRequired
  }

  componentWillReceiveProps(newProps) {
    if (newProps.reduxState.needGetGif && newProps.reduxState.needGetGif !== this.props.reduxState.needGetGif) {
      this.getGif()
    }
  }

  getGif = () => {
    const { reduxSetState } = this.props  
    fetch('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC')
      .then(response => response.json())
      .then(response => reduxSetState('NEW-GIF', { // `${actionPrefix}/@NEW-GIF` 
        src: response.data.fixed_width_small_still_url, 
        needGetGif: false 
      }))
      .catch(() => reduxSetState('ERROR-LOADING-NEW-GIF', {
        needGetGif: false 
      }))
  }

  render() {
    const { reduxState: { src }, style = {}, reduxSetState } = this.props
    return ( 
      <div style={style}>
        <button onClick={() => reduxSetState('NEED-GET-GIF', { needGetGif: true })}>
          Get gif
        </button>
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
  }
}

export default createReducer({
  initialState: {
    src: null,
    needGetGif: false    
  },
  listenActions: (props) => {
    const actions = {}
    if (props.needGetGifAction) {
      actions[props.needGetGifAction] = () => ({ needGetGif: true })
    }
    return actions            
  }
})(RandomGif)

