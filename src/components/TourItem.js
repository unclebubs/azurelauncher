import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

function TourItem ({ title, image, text, handleClick }) {
  return (
    <Card
      as='a'
      style={{ width: '100%' }} onClick={(e) => {
        handleClick()
      }}
    >
      <Card.Img variant='top' src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {/* {text ? <div dangerouslySetInnerHTML={{ __html: text }} /> : null} */}
      </Card.Body>
    </Card>
  )
}

TourItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  handleClick: PropTypes.func,
  text: PropTypes.string
}

export default TourItem
