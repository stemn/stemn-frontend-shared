import React from 'react'
import Popover from 'stemn-shared/misc/Popover'
import MdExpandMore from 'react-icons/md/expand-more'
import Button from 'stemn-shared/misc/Buttons/Button/Button'
import classNames from 'classnames'

export default (props) => {
  const { children, options, value } = props
  const currentOption = options.find(option => option.value === value)
  return (
    <Popover preferPlace="below" tipSize={ 1 }>
      <Button className="light">
        { children }
        { currentOption && currentOption.name ? currentOption.name : 'none' }
        <MdExpandMore style={ { marginLeft: '5px' } } size={ 20 } />
      </Button>
      <div className="PopoverMenu">
        { options.map(option => (
          <a
            onClick={ option.onClick }
            className={ classNames({'active' : value === option.value}) }
          >
            { option.name }
          </a>
        ))}
      </div>
    </Popover>
  )
}