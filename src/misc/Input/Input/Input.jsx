import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { omit } from 'lodash';

export const Component = React.createClass({
  getInitialState () {
    return {
      value: this.props.value,
    }
  },
  onChange(event){
    const { model, dispatch, type, changeAction } = this.props;
    const prevValue = this.state.value;
    let newValue = event.target.value;

    // Toggle if checkbox
    // Value can be: true || false || 'other' || undefined
    if(type == 'checkbox'){
      const isFalse = prevValue === 'false' || prevValue === false || prevValue === undefined;
      newValue = isFalse ? true : false; // toggle
    }

    if(model){
      // If model exists, we dispatch an update
      this.props.dispatch(actions.change(model, newValue));
    }
    if(changeAction){
      // If a changeActions exists, we run it
      changeAction({value: newValue, model})
    }
    // We update our internal state
    this.setState({value: newValue});
  },
  componentWillReceiveProps(nextProps) {
    // Update the internal state if it differs from the redux state
    if(nextProps.value != this.state.value){
      this.setState({ value: nextProps.value })
    }
  },
  componentDidMount(){
    if(this.props.autoFocus){
      setTimeout(() => this.refs.input.focus(), 1);
    }
  },
  render() {
    const otherProps = omit(this.props, ['dispatch', 'model', 'value', 'changeAction']);
    const { value } = this.state;
    return <input ref="input" {...otherProps} onChange={this.onChange} value={value}/>
  }
});

export default connect()(Component);