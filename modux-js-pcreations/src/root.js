import React from 'react'
import moduxFactory from 'modux-js'

import newGifCounterAndButtonModux from './newGifCounterAndButton';
import gifViewerModux, { init as initGifViewer, types as gifViewerTypes } from './gif-viewer';
import gifViewerPairModux, { init as initGifViewerPair } from './gif-viewer-pair';
import gifViewerPairPairModux, { init as initGifViewerPairPair } from './gif-viewer-pair-pair';
import giViewerList from './gif-viewer-list';

export default moduxFactory(context => {
  context.add(newGifCounterAndButtonModux, 'newGifCounterAndButton')
  context.add(gifViewerModux, 'cats', initGifViewer('high five'))
  context.add(gifViewerPairModux, 'gifViewerPair', initGifViewerPair('jugding you', 'bored'))
  context.add(gifViewerPairPairModux, 'gifViewerPairPair', initGifViewerPairPair([
    'annoyed',
    'unsure'
  ],[
    'terrified',
    'excited'
  ]))
  context.add(giViewerList, 'gifViewerList')
  return {
    initView() {
      const {
        Button,
        Counter: NewGifCounter
      } = context.getView('newGifCounterAndButton')
      const CatsGifViewer = context.getView('cats')
      const GifViewerPair = context.getView('gifViewerPair')
      const GifViewerPairPair = context.getView('gifViewerPairPair')
      const GifViewerList = context.getView('gifViewerList')
      return () => (
        <div>
          <div>
            <Button/>
          </div>
          <div>
            <NewGifCounter/>
          </div>
          <h1>Random gifs</h1>
          <div>
            <CatsGifViewer/>
          </div>
          <hr/>
          <h1>Random Gif Pair</h1>
          <GifViewerPair/>
          <hr/>
          <h1>Random Gif Pair Pair</h1>
          <GifViewerPairPair/>
          <hr/>
          <h1>Dynamic list of Gif Viewers</h1>
          <GifViewerList/>
        </div>
      )
    }
  }
})()  // we directly export an instantiated modux, not the factory, since there is only one root
