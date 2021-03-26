import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Fade } from 'react-bootstrap'
import { FaPlay } from '@react-icons/all-files/fa/FaPlay'

function TourItem ({ title, image, text, handleClick, showTourTitle, showTourDescription }) {
  const [isHovering, setIsHovering] = useState(false)

  const renderTourDetails = () => {
    if ((showTourTitle && title) || (showTourDescription && text)) {
      return (
        <Card.Body>
          {showTourTitle && title ? <Card.Title>{title}</Card.Title> : null}
          {showTourDescription && text ? <div dangerouslySetInnerHTML={{ __html: text }} /> : null}
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
          <Card.ImgOverlay style={styles.tourItemOverlay} className='d-flex align-items-center justify-content-center'>
            <FaPlay color='white' size='20%' />
          </Card.ImgOverlay>
        </Fade>
      </div>
      {renderTourDetails()}

    </Card>
  )
}

TourItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  handleClick: PropTypes.func,
  text: PropTypes.string,
  showTourTitle: PropTypes.bool,
  showTourDescription: PropTypes.bool
}

const styles = {
  imageContainer: {
    position: 'relative'
  },
  tourItemOverlay: {
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  }
}

export default TourItem
