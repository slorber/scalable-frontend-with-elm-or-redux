import { Map } from 'immutable'
import * as btn from '../button/model'
import * as ctr from '../counter/model'
import * as rnd from '../rndgif/model'
import * as rnp from '../rndgif-pair/model'
import * as rpp from '../rndgif-pair-pair/model'
import * as uniq from '../unique/model'
import * as lst from '../rndgif-list/model'

export const K = {
  btn: 'btn',
  ctr: 'ctr',
  rnd: 'rnd',
  uniq: 'uniq',
  list: 'list',
  pair: 'rndp',
  pairPair: 'rndpp'
}

export const init = (topic, p1, p2, pp1, pp2, pp3, pp4) => Map({
  [K.btn]: btn.init(),
  [K.ctr]: ctr.init(),
  [K.rnd]: rnd.init(topic),
  [K.list]: lst.init(),
  [K.uniq]: uniq.init({
    [K.pair]: rnp.init(p1, p2),
    [K.pairPair]: rpp.init(pp1, pp2, pp3, pp4)
  })
})
export const initDef = () => init('funny cats', 'funny dogs', 'albatros', 'alpaca', 'meme', 'random', 'any')

export const pairKey = K.pair
export const pairPairKey = K.pairPair

export const getButton = (state) => state.get(K.btn)
export const btnIsActive = getButton

export const getCounter = (state) => state.get(K.ctr)
export const getRandomGif = (state) => state.get(K.rnd)
export const getRndGifList = (state) => state.get(K.list)
export const getRndGifPair = (state) => state.getIn([K.uniq, K.pair])
export const getRndGifPairPair = (state) => state.getIn([K.uniq, K.pairPair])
