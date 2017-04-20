/**************************************************
This component will take in a model and value and
set the value to the store when the component mounts.

This is useful for initialising a new form data
section in the store.
**************************************************/

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { get } from 'lodash'


const stateToProps = () => ({
})

const dispatchToProps = {
  load: actions.load,
}

@connect(stateToProps, dispatchToProps)
export default class Form extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    model: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
  }
  componentWillMount() { 
    this.props.load(this.props.model, this.props.value);
  }
  render() {
    const { children } = this.props
    return (
      <form>
        { children }
      </form>
    )
  }
}
