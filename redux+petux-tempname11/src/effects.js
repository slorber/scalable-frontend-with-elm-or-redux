/* @flow */
import type { Action, Effect } from './App/types';

function loadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject();
    image.src = src;
  });
}

const apiKey = 'dc6zaTOxFJmzC'; // public beta key;
const api = topic => `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&topic=${topic}`;

async function fetchGif(topic: string): Promise<string> {
  const response = await fetch(api(topic));
  const json = await response.json();
  const src = json.data.image_url;
  await loadImage(src);
  if (Math.random() > 0.9) {
    throw new Error('Simulated network failure.');
  }
  return src;
}

export const handler = (dispatch: (Action) => void) => (effect: Effect<Action>) => {
  console.warn('Effect:', effect.base);

  if (effect.base.kind === 'REQUEST_NEW_GIF') {
    fetchGif(effect.base.topic).then((src) => {
      dispatch(effect.route({ type: 'REQUEST_SUCCEDED', src }));
    }, (error) => {
      dispatch(effect.route({ type: 'REQUEST_FAILED' }));
    });
  }
}
