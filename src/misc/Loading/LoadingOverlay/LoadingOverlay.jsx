import React, { PropTypes, Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// Components
import LoadingSpinner from 'stemn-shared/misc/Loading/LoadingSpinner/LoadingSpinner'
import LoadingLinear  from 'stemn-shared/misc/Loading/LoadingLinear/LoadingLinear.jsx'

// Styles
import classes from './LoadingOverlay.css'
import classNames from 'classnames'

const propTypesObject = {
  size: PropTypes.string,               // 'sm' || 'lg' - Changes the size of the spinner
  show: PropTypes.bool,                 // Should we show the overlay?
  children: PropTypes.node,                 // Text to show under the spinner
  style: PropTypes.object,               // Styles object
  linear: PropTypes.bool,                 // Change the spinner to a linear bar
  hideBg: PropTypes.bool,                 // Make the bg transparent
  noOverlay: PropTypes.bool,                 // Makes the overlay just at the top (for use with the linear == true)
  background: PropTypes.string,               // Custom background colour
  progress: PropTypes.number,               // Progress percentage - makes the spinner determinate
}


export default React.createClass({
  propTypes: propTypesObject,
  getInitialState() {
    return {
      loading: false,
    }
  },
  componentWillReceiveProps(nextProps) {
    const prevProps = this.props
    // If we just began loading:
    if (nextProps.show && (!prevProps || !prevProps.show)) {
      this.startLoading()
    }
    // If we finished loading
    else if (prevProps && prevProps.show && !nextProps.show) {
      this.endLoading()
    }
  },
  startLoading() {
    //    console.log('start-loading');
  },
  endLoading() {
    //    console.log('end-loading');
  },
  render() {
    const { size, show, children, style, linear, hideBg, noOverlay, background, progress } = this.props
    const { loading } = this.state

    const transitionName = {
      enter: classes.enter,
      enterActive: classes.enterActive,
      leave: classes.leave,
      leaveActive: classes.leaveActive,
      appear: classes.appear,
      appearActive: classes.appearActive,
    }

    const backgroundStyles = background ? {
      background,
    } : {}

    const noOverlayStyles = noOverlay ? {
      height: '5px',
      bottom: 'auto',
    } : {}

    const allStyles = Object.assign({}, backgroundStyles, noOverlayStyles, style)

    return (
      <ReactCSSTransitionGroup
        transitionName={ transitionName }
        transitionAppear
        transitionAppearTimeout={ 300 }
        transitionEnterTimeout={ 300 }
        transitionLeaveTimeout={ 300 }
      >
        { show
          ? <div className={ classNames(classes.loadingOverlay, hideBg ? '' : classes.bgWhite) } style={ allStyles }>
            { linear
              ? <LoadingLinear />
              : <div className={ classes.loaderContainer }>
                <LoadingSpinner size={ size } progress={ progress } />
                {children ? <div className={ classes.text }>{children}</div> : null}
              </div>
            }
          </div>
          : null }
      </ReactCSSTransitionGroup>
    )
  },
})

