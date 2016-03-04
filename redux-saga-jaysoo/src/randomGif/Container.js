import React from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import * as actions from './actions'
import { getModel } from './selectors'

export class Component extends React.Component {
  componentDidMount() {
    const { model, requestMore } = this.props
    requestMore(model.topic)
  }
  render() {
    const { model, requestMore } = this.props
    return (
      <div style={{ width: '200px' }}>
        <p><strong>Topic:</strong> {model.topic}</p>
        <div style={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {
            model.cata(
              { Empty: () => <span>--</span>
                , Pending: () => <span>Loading...</span>
                , Loaded: (topic, url) => <img src={url} style={{ width: '200px' }}/>
              }
            )
          }
        </div>
        <button onClick={() => requestMore(model.topic)} style={{ width: '200px' }}>
          More
        </button>
      </div>
    )
  }
}

export default connect(
  createStructuredSelector({ model: getModel })
  ,
  dispatch => bindActionCreators(actions, dispatch)
)(Component)
