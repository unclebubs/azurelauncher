
import React, { useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TourItem from './components/TourItem'
import './App.css'
import TourView from './components/TourView'
var data = require('./data/data.json')

function RenderData () {
  const [vrSRC, setVRSRC] = useState(null)
  const [vrOpen, setVROpen] = useState(false)
  const listContainer = useRef(null)

  const openVR = (src) => {
    setVRSRC(src)
    setVROpen(true)
  }

  const renderTourItems = (tourItems) => {
    const renderedTourItems = tourItems.map(tourItem => {
      return (
        <Col className='mb-4' key={tourItem.key}>
          <TourItem
            title={tourItem.title}
            image={tourItem.image}
            handleClick={() => { openVR(tourItem.link) }}
          />
        </Col>
      )
    })
    return renderedTourItems
  }

  const titles = data.map(section => {
    const tours = renderTourItems(section.tours)

    return (
      <Container fluid className='mt-4' key='container'>
        <TourView
          src={vrSRC} open={vrOpen} onCancel={() => {
            setVROpen(false)
          }}
        />
        <div>
          <Row className='mx-1'><h1>{section.title}</h1></Row>
          <Row xs={2} sm={3} md={4} lg={6}>
            {tours}
          </Row>

        </div>
        <div ref={listContainer} />
      </Container>
    )
  })
  return titles
}

function App () {
  console.log('data', data)
  return <RenderData />
}

export default App
