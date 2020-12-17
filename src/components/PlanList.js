import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchVirtualTours } from '../actions'
import PropTypes from 'prop-types'
import { Row, Col, Fade } from 'react-bootstrap'
import TourItem from './TourItem'
import { FaSpinner } from '@react-icons/all-files/fa/FaSpinner'

const PlanList = ({ userId, onload, planId, openVR, xs, sm, md, lg, xl }) => {
  const dispatch = useDispatch()
  const tourSelector = (state) => state.tours
  const tours = useSelector(tourSelector)

  useEffect(() => {
    // dispatch(fetchVirtualTours('zaJbATKfpXToPLTjmARndxoUHo63', '-MMV7a5HZ4eyn5SOPbfJ'))
    dispatch(fetchVirtualTours(userId, planId))
  }, tours)

  const TourListItems = (props) => {
    const { loading } = props
    const virtualTours = tours.tours
    const renderedTourItems = virtualTours.map(tourItem => {
      return (
        <Col className='mb-4' key={tourItem.key}>
          <TourItem
            title={`${tourItem.name}`}
            image={tourItem.image}
            text={tourItem.description}
            handleClick={(offsetTop) => {
              console.log('Got the click')
              const url = `https://azure-vr.com/vr/index.html?userId=${userId}&planId=${planId}&tourId=${tourItem.id}`
              window.open(url, '_blank', 'fullscreen=yes,location=no,menubar=no')
            }}
          />
        </Col>
      )
    })
    if (renderedTourItems.length > 0) {
      return renderedTourItems
    }

    if (!loading) { return <h3>No Tours found for given plan</h3> }
  }

  TourListItems.propTypes = {
    loading: PropTypes.bool
  }

  const Loading = (props) => {
    const { loading } = props
    return (
      <Fade in={loading} unmountOnExit>
        <Row style={{ height: 100 }}>
          <Col className='d-flex' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <h1><FaSpinner className='fa-spin' /></h1>
          </Col>
        </Row>
      </Fade>
    )
  }

  Loading.propTypes = {
    loading: PropTypes.bool
  }

  const RenderPlans = (props) => {
    const { loading, onload } = props
    const { plan } = tours
    const container = useRef(null)
    if (plan) {
      return (
        <Fade in={!loading}>
          <div ref={container} key={plan.key} onLoad={() => { onload() }}>
            <Row className='mx-1'><h1>{plan.name}</h1></Row>
            <Row xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <TourListItems loading={loading} />
            </Row>
          </div>
        </Fade>
      )
    }

    return <h3>No content found</h3>
  }

  RenderPlans.propTypes = {
    loading: PropTypes.bool,
    onload: PropTypes.func
  }

  const { loading } = tours

  return (
    <div id='qwerty'>
      <RenderPlans loading={loading} onload={onload} />
      <Loading loading={loading} />
    </div>
  )
}

PlanList.propTypes = {
  userId: PropTypes.string,
  planId: PropTypes.string,
  openVR: PropTypes.func,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  loading: PropTypes.bool,
  onload: PropTypes.func
}

PlanList.defaultProps = {
  xs: 1,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6
}

export default PlanList
