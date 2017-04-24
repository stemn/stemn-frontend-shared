import React from 'react'
import classNames from 'classnames'
import classes from './SearchInput.css'
import MdSearch from 'react-icons/md/search'
import Input from 'stemn-shared/misc/Input/Input/Input'

export default (props) => (
  <div className={ classNames(classes.search, 'layout-row layout-align-start-center') }>
    <Input
      className="flex"
      { ...props }
    />
    <MdSearch className={ classes.icon } size={ 20 } />
  </div>
)