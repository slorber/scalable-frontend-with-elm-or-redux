import request from 'helpers/superagent';
import _ from 'lodash';
import {newGif, requestError} from './actions';

export const fetchRandomGif = (topic) => {
  return request.get('https://api.giphy.com/v1/gifs/random')
    .query({
      api_key: 'dc6zaTOxFJmzC',
      tag: topic,
    })
    .endAsync()
    .then((res) => {
      const url = _.get(res, 'body.data.image_url');
      return newGif(url);
    })
    .catch(requestError);
}
