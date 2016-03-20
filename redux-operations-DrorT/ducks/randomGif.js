import {INIT_REDUX_OPERATIONS} from 'redux-operations';
export const UPDATE_GIF = 'UPDATE_GIF'
export const NEW_GIF = 'NEW_GIF'

export function updateGif(topic, location, name) {
  return {
    type: UPDATE_GIF,
    meta: {location, name},
    payload: {topic}
  }
}

export function newGif(imgUrl, location, name) {
  return {
    type: NEW_GIF,
    meta: {location, name},
    payload: {imgUrl}
  }
}



export const randomGif = (state = '', action) => {
  if (action.type !== INIT_REDUX_OPERATIONS) return state;
  return {
    UPDATE_GIF: {
      priority: 1,
      resolve: (state = '', action)=> {
        const {dispatch, location, name} = action.meta;
        const {topic} = action.payload;
        window.fetch('https://api.giphy.com/v1/gifs/random?tag='+topic.split(' ').join('+')+'&api_key=dc6zaTOxFJmzC')
          .then(res => {
            return res.json()
          })
          .then(json => {
            dispatch(newGif(json.data.image_url, location, name));
          })
          .catch(err => {
            console.log('ERR', err)
          });
        return state;
      },
      arguments:{
        topic: {type: String, description: 'The topic to search for a gif for'}
      }
    },
    NEW_GIF: {
      priority: 1,
      resolve: (state = '', action) => action.payload.imgUrl,
      arguments: {
        imgUrl: {type: String, description: 'The URL for the gif to show'}
      }
    },
    signature: '@@reduxOperations'
  }
};

