import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import TourItem from './TourItem'

const PlanList = ({ data, openVR, xs, sm, md, lg, xl }) => {
  const renderTourItems = (tourItems) => {
    const renderedTourItems = tourItems.map(tourItem => {
      return (
        <Col className='mb-4' key={tourItem.key}>
          <TourItem
            title={tourItem.title}
            image={tourItem.image}
            handleClick={() => {
              console.log('Got the click')
              openVR(tourItem.link)
            }}
          />
        </Col>
      )
    })
    return renderedTourItems
  }

  const renderPlans = () => {
    const plans = data.map(plan => {
      const tours = renderTourItems(plan.tours)
      return (
        <div key={plan.key}>
          <Row className='mx-1'><h1>{plan.title}</h1></Row>
          <Row xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
            {tours}
          </Row>
        </div>
      )
    })
    return plans
  }

  return (renderPlans())
}

PlanList.propTypes = {
  data: PropTypes.object,
  openVR: PropTypes.func,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number
}

PlanList.defaultProps = {
  xs: 1,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6
}

export default PlanList
