import { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class DynamicPortal extends Component {
  constructor (props) {
    super(props)
    const { container, containerClass = '', containerId, style } = this.props
    this.portal = document.createElement('div')
    this.portal.setAttribute('class', containerClass)
    this.portal.setAttribute('style', style)
    if (containerId) {
      this.portal.id = containerId
    }
    container.appendChild(this.portal)
  }

  componentWillUnmount () {
    this.portal.remove()
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.portal)
  }

  static get propTypes () {
    return {
      container: PropTypes.object,
      containerClass: PropTypes.string,
      containerId: PropTypes.string,
      children: PropTypes.node,
      style: PropTypes.string
    }
  }
}

export default DynamicPortal
