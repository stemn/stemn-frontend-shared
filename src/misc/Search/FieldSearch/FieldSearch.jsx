import React, { Component, PropTypes } from 'react'

import classes from './FieldSearch.css'
import Autosuggest from 'stemn-shared/misc/Autosuggest/Autosuggest.container'
import Highlight from 'stemn-shared/misc/Autosuggest/Highlight'


export default class FieldSearch extends Component {
  static propTypes = {
    clickResult: PropTypes.func.isRequired,
    cacheKey: PropTypes.string.isRequired,
    showNewFieldModal: PropTypes.func.isRequired,
  }

  renderResult = (suggestion, { query }) => {
    return (
      <div className="layout-row layout-align-start-center">
        <Highlight text={ suggestion.name } query={ query } hightlightClass={ classes.highlight }/>
      </div>
    )
  }

  renderNoResult = (suggestion, { query }) => {
    return (
      <div>
        Create field: <b>{ query }</b>
      </div>
    )
  }

  clickNoResult = (result) => {
    console.log('click no result', result)
    this.props.showNewFieldModal({
      name: result.query,
    }).then(({ value }) => {
      console.log({ value });
      this.props.clickResult(value)
    })
  }

  render() {
    const { clickResult, cacheKey } = this.props
      
    return (
      <Autosuggest
        cacheKey={ `field-search-${cacheKey}` }
        placeholder="Search and add tags"
        clickResult={ clickResult }
        clickNoResult={ this.clickNoResult }
        renderResult={ this.renderResult }
        renderNoResult={ this.renderNoResult }
        entityType="field"
      />
    );
  }
}
