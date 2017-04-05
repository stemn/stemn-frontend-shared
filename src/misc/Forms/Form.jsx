import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';


const stateToProps = () => ({});
const dispatchToProps = {
  load: actions.load,
};

@connect(stateToProps, dispatchToProps)
export default class Form extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    model: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }
  componentWillMount() { 
    this.props.load(this.props.model, this.props.value);
  }
  render() {
    return (
      <form>
        { this.props.children }
      </form>
    )
  }
}