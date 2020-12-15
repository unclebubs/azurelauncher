import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

function TourItem ({ title, image, handleClick }) {
  return (
    <Card
      style={{ width: '100%' }} onClick={() => {
        handleClick()
      }}
    >
      <Card.Img variant='top' src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

TourItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  handleClick: PropTypes.func
}

export default TourItem
