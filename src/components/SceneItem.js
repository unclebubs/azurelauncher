import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Fade } from 'react-bootstrap'
import { FaPlay } from '@react-icons/all-files/fa/FaPlay'

function SceneItem ({ title, image, text, handleClick, showSceneTitle, showSceneDescription }) {
  const [isHovering, setIsHovering] = useState(false)

  const renderSceneDetails = () => {
    if ((showSceneTitle && title) || (showSceneDescription && text)) {
      return (
        <Card.Body>
          {showSceneTitle && title ? <Card.Title>{title}</Card.Title> : null}
          {showSceneDescription && text ? <div dangerouslySetInnerHTML={{ __html: text }} /> : null}
        </Card.Body>
      )
    }

    return null
  }

  return (
    <Card
      onMouseEnter={(event) => { setIsHovering(true) }}
      onMouseLeave={(event) => { setIsHovering(false) }}
      className='tour-item'
      as='a'
      onClick={(e) => {
        handleClick()
      }}
    >
      <div style={styles.imageContainer}>
        <Card.Img variant='top' src={image} />
        <Fade in={isHovering}>
          <Card.ImgOverlay style={styles.SceneItemOverlay} className='d-flex align-items-center justify-content-center'>
            <FaPlay color='white' size='20%' />
          </Card.ImgOverlay>
        </Fade>
      </div>
      {renderSceneDetails()}

    </Card>
  )
}

SceneItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  handleClick: PropTypes.func,
  text: PropTypes.string,
  showSceneTitle: PropTypes.bool,
  showSceneDescription: PropTypes.bool
}

const styles = {
  imageContainer: {
    position: 'relative'
  },
  SceneItemOverlay: {
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  }
}

export default SceneItem
