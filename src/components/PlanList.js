import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchVirtualTours } from '../actions'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import Fade from 'react-bootstrap/Fade'
import TourItem from './TourItem'
import { FaSpinner } from '@react-icons/all-files/fa/FaSpinner'
import { FaExclamationTriangle } from '@react-icons/all-files/fa/FaExclamationTriangle'

const PlanList = ({ userId, onload, handlePlanClick, planId, tourId, xs, sm, md, lg, xl, preview }) => {
  const dispatch = useDispatch()
  const tourSelector = (state) => state.tours
  const tours = useSelector(tourSelector)
  // const [loaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(fetchVirtualTours(userId, planId, tourId, preview))
  }, [])

  const TourListItems = (props) => {
    const { loading, handlePlanClick } = props
    const virtualTours = tours.tours
    const renderedTourItems = virtualTours.map(tourItem => {
      return (
        <Col className='mb-4 flex align-items-stretch' key={tourItem.id} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
          <TourItem
            title={`${tourItem.name}`}
            image={tourItem.image}
            text={tourItem.description}
            handleClick={(offsetTop) => {
              handlePlanClick({ userId, planId, tourId: tourItem.id })
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

    const handleLoaded = () => {
      // setIsLoaded(true)
    }

    return (
      <Fade
        in={loading} unmountOnExit onExited={handleLoaded}
      >
        <Row>
          <Col className='d-flex spin-container'>
            <h1><FaSpinner className='fa-spin' /></h1>
          </Col>
        </Row>
      </Fade>
    )
  }

  Loading.propTypes = {
    loading: PropTypes.bool
  }

  const LoadError = ({ container, onload }) => {
    return (
      <div className='planContainer' ref={container} onLoad={() => { onload() }}>
        <Row>
          <Col className='d-flex' style={{ justifyContent: 'center', alignItems: 'center' }}>
            <h3 style={{ textAlign: 'center' }}>
              <FaExclamationTriangle color='red' className='mr-2' />Oops! Something went wrong
            </h3>
          </Col>
        </Row>
      </div>
    )
  }

  LoadError.propTypes = {
    container: PropTypes.object,
    onload: PropTypes.func
  }

  const NoContent = ({ container, onload }) => {
    return (
      <div className='planContainer' ref={container} onLoad={() => { onload() }}>
        <Row>
          <Col className='d-flex' style={{ justifyContent: 'center', alignItems: 'center' }}>
            <h3 style={{ textAlign: 'center' }}>
              <FaExclamationTriangle color='red' className='mr-2' />Oops! No content found
            </h3>
          </Col>
        </Row>
      </div>
    )
  }

  NoContent.propTypes = {
    container: PropTypes.object,
    onload: PropTypes.func
  }

  const RenderPlans = (props) => {
    const { onload, handlePlanClick } = props
    const { plan, loading, loadingError } = tours
    const container = useRef(null)
    if (plan) {
      return (
        <Fade in={!loading}>
          <div className='planContainer' ref={container} key={plan.key}>
            <Row className='planDetailsContainer'>
              <Col>
                <h1>{plan.name}</h1>
                {plan.description ? <div dangerouslySetInnerHTML={{ __html: plan.description }} /> : null}
              </Col>
            </Row>
            <Row className='planListContainer'>
              <TourListItems loading={loading} handlePlanClick={handlePlanClick} />
            </Row>
          </div>
        </Fade>
      )
    } else if (!plan && !loading && !loadingError) {
      return <NoContent container={container} onload={onload} />
    } else if (!plan && !loading && loadingError) {
      return <LoadError container={container} onload={onload} />
    }
    return null
  }

  RenderPlans.propTypes = {
    onload: PropTypes.func,
    handlePlanClick: PropTypes.func
  }

  const { loading } = tours

  return (
    <>
      <RenderPlans onload={onload} handlePlanClick={handlePlanClick} />
      <Loading loading={loading} />
    </>
  )
}

PlanList.propTypes = {
  userId: PropTypes.string,
  planId: PropTypes.string,
  tourId: PropTypes.string,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  loading: PropTypes.bool,
  onload: PropTypes.func,
  preview: PropTypes.bool,
  handlePlanClick: PropTypes.func
}

PlanList.defaultProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 12,
  preview: false
}

export default PlanList
