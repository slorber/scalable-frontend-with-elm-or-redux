import { h } from 'deku'
import Unique         from '../unique/component'
import Button         from '../button/component'
import Counter        from '../counter/component'
import RndGif         from '../rndgif/component'
import RndGifList     from '../rndgif-list/component'
import RndGifPair     from '../rndgif-pair/component'
import RndGifPairPair from '../rndgif-pair-pair/component'
import * as m from './model'

const Section = (title, comp) => (
  h('section', {class: 'container'}, [
    h('h1', {class: 'sec-title'}, [title]),
    comp
  ])
)

const URndGifPair = Unique(m.pairKey, RndGifPair)
const URndGifPairPair = Unique(m.pairPairKey, RndGifPairPair)

const comp = ({ props }) => (
  h('div', {id: 'main'}, [
    Section('The Button', Button(props.button)),
    Section('The NewGif Counter', Counter(props.counter)),
    Section('The Random Gif', RndGif(props.rndgif)),
    Section('The Dynamic list of Random Gifs', RndGifList(props.rg_list)),
    Section('The Pair of Random Gifs', URndGifPair(props.rg_pair)),
    Section('The Pair of Pair of Random Gifs', URndGifPairPair(props.rg_pair_pair))
  ])
)

export default (state) => (
  h(comp, {
    button: m.getButton(state),
    counter: m.getCounter(state),
    rndgif: m.getRandomGif(state),
    rg_list: m.getRndGifList(state),
    rg_pair: m.getRndGifPair(state),
    rg_pair_pair: m.getRndGifPairPair(state)
  })
)
