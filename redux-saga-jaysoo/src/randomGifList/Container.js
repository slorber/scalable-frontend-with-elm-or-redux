import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as randomGif from '../randomGif'
import * as actions from './actions'
import { getModel } from './selectors'

export const Component = ({ add
                          , changeTopic
                          , requestMore
                          , model
                          }) => (
    <div>
      <input value={model.topic} onChange={(e) => changeTopic(e.target.value)} style={{ width: '200px' }}/>
      <br/>
      <button onClick={() => add(model.topic)} style={{ width: '200px' }}>
        Add
      </button>
      { model.gifs.map(
          m => <randomGif.Component
                 key={m.id}
                 model={m[randomGif.name]}
                 requestMore={() => requestMore({ id: m.id, topic: m[randomGif.name].topic })}/>) }
    </div>
)

export default connect(
  createStructuredSelector({ model: getModel })
  ,
  dispatch => bindActionCreators(actions, dispatch)
)(Component)
