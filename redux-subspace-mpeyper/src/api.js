export default class API {
  getRandomGifUrl() {
    return fetch(`https://api.giphy.com/v1/gifs/random?api_key=26ae311d361143eda202a3670a1b0c63`)
      .then((response) => response.json())
      .then((json => json.data.fixed_width_small_url))
  }
}
