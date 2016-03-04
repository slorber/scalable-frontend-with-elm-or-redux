import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as randomGifPair from '../randomGifPair'
import * as actions from './actions'
import { getTopLeft, getTopRight, getBottomLeft, getBottomRight } from './selectors'

export const Component = (
  { requestMore
  , topRight
  , topLeft
  , bottomRight
  , bottomLeft
  }
) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1 }}>
        <h5>Top</h5>
        <randomGifPair.Component
          left={topLeft}
          right={topRight}
          requestMore={({ side, topic }) =>
            requestMore({ position: { x: side, y: 'top' }, topic })}/>
      </div>
      <div style={{ flexGrow: 1 }}>
        <h5>Bottom</h5>
        <randomGifPair.Component
          left={bottomLeft}
          right={bottomRight}
          requestMore={({ side, topic }) =>
            requestMore({ position: { x: side, y: 'bottom' }, topic })}/>
      </div>
    </div>
  )

}
export default connect(
  createStructuredSelector(
    { topRight: getTopRight
    , topLeft: getTopLeft
    , bottomRight: getBottomRight
    , bottomLeft: getBottomLeft
    }
  )
  ,
  dispatch => bindActionCreators(actions, dispatch)
)(Component)
