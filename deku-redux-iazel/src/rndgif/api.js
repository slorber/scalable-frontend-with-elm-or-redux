import qwest from 'qwest'

function fetchNewGif(topic) {
  const rq = qwest.get('https://api.giphy.com/v1/gifs/random', {
    api_key: 'dc6zaTOxFJmzC',
    topic
  }, {cache: true})
  return rq.then((xhr, resp) => resp.data.image_url)
}

export default {
  fetchNewGif
}
