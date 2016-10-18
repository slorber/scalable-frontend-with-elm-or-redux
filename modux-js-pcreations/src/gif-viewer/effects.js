import fetch from 'isomorphic-fetch'

export const fetchGif = (topic) =>
  fetch(`https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${topic}`)
  .then(res => res.json())
  .then(body => typeof body.data === 'undefined' ? '' : body.data.image_url)
