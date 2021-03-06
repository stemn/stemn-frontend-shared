import React from 'react'

// Styles
import classNames from 'classnames'
import classes from './MoreButton.css'

import MdChevronRight from 'react-icons/md/chevron-right'


export default React.createClass({
  render() {
    return (
      <a
        title={ this.props.title }
        onClick={ this.props.onClick }
        className={ classNames(classes.moreButton, { [classes.moreButtonRight]: this.props.side == 'right' }, { [classes.moreButtonLeft]: this.props.side == 'left' }) }
      >
        <MdChevronRight size="15" />
      </a>
    )
  },
})
