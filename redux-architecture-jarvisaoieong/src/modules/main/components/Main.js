import React, {Component} from 'react';

import RandomGifContainer from './RandomGifContainer';
import RandomGifPairContainer from './RandomGifPairContainer';
import RandomGifPairOfPairContainer from './RandomGifPairOfPairContainer';
import RandomGifListContainer from './RandomGifListContainer';
import ButtonContainer from './ButtonContainer';
import CounterContainer from './CounterContainer';

export default () =>
  <div>
    <h2>Counter</h2>
    <CounterContainer />
    <hr/>
    <h2>Button</h2>
    <ButtonContainer />
    <hr/>
    <h2>RandomGif</h2>
    <RandomGifContainer />
    <hr/>
    <h2>RandomGifPair</h2>
    <RandomGifPairContainer />
    <hr/>
    <h2>RandomGifPairOfPair</h2>
    <RandomGifPairOfPairContainer />
    <hr/>
    <h2>RandomGifList</h2>
    <RandomGifListContainer />
  </div>
