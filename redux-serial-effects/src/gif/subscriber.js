import states from './states'
import { updated } from './actions'

const subscriber = ({ from, to }, dispatch) => {
  if (to.state !== from.state && to.state === states.request) {
    fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&topic=${to.topic}`
    )
      .then(response => response.json())
      .then(json => {
        dispatch(updated(json.data.image_url))
      })
  }
}

export default subscriber
