import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchScenes } from '../actions'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import Fade from 'react-bootstrap/Fade'
import SceneItem from './SceneItem'
import { FaSpinner } from '@react-icons/all-files/fa/FaSpinner'
import { FaExclamationTriangle } from '@react-icons/all-files/fa/FaExclamationTriangle'

const SceneList = ({
  userId,
  showSceneTitle,
  showTourTitle,
  showTourDescription,
  showSceneDescription,
  onload,
  handleSceneClick,
  planId,
  tourId,
  xs,
  sm,
  md,
  lg,
  xl,
  preview
}) => {
  const dispatch = useDispatch()
  const toursSelector = (state) => state.tours
  const tourSelector = (state) => state.tours.tour
  const scenesSelector = (state) => state.tours.scenes
  const tours = useSelector(toursSelector)
  const tour = useSelector(tourSelector)
  const scenes = useSelector(scenesSelector)

  useEffect(() => {
    dispatch(fetchScenes(userId, planId, tourId, preview))
  }, [])

  const SceneListItems = (props) => {
    const { loading, handleSceneClick } = props
    const renderedSceneItems = scenes.map(sceneItem => {
      return (
        <Col className='mb-4 flex align-items-stretch' key={sceneItem.id} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
          <SceneItem
            title={`${sceneItem.name}`}
            image={sceneItem.thumbnailImage ? sceneItem.thumbnailImage : sceneItem.image}
            text={sceneItem.description}
            handleClick={(offsetTop) => {
              handleSceneClick({ userId: sceneItem.userId, planId: sceneItem.planId, tourId: sceneItem.tourId, sceneId: sceneItem.id })
            }}
            showTourTitle={showTourTitle}
            showTourDescription={showTourDescription}
            showSceneTitle={showSceneTitle}
            showSceneDescription={showSceneDescription}
          />
        </Col>
      )
    })
    if (renderedSceneItems.length > 0) {
      return renderedSceneItems
    } else if (renderedSceneItems === null || renderedSceneItems.length === 0) {
      return <p>No scenes</p>
    }

    if (!loading) { return <h3>No Scenes found for given plan</h3> }

    return <p>why here</p>
  }

  SceneListItems.propTypes = {
    loading: PropTypes.bool,
    handleSceneClick: PropTypes.func
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
          <Col className='d-flex spin-container mt-3'>
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

  const RenderScenes = (props) => {
    const { onload, handleSceneClick } = props
    const { loading, loadingError } = tours
    const container = useRef(null)

    const renderTourDetails = () => {
      if ((showTourTitle && tour.name) || (showTourDescription && tour.description)) {
        return (
          <Row className='planDetailsContainer'>
            <Col>
              {showTourTitle && tour.name ? <h1>{tour.name}</h1> : null}
              {showTourDescription && tour.description ? <div dangerouslySetInnerHTML={{ __html: tour.description }} /> : null}
            </Col>
          </Row>
        )
      }
      return null
    }
    if (scenes) {
      return (
        <Fade in={!loading}>
          <div className='planContainer' ref={container} key={`sceneList-${tour.id}`}>
            {renderTourDetails()}
            <Row className='planListContainer'>
              <SceneListItems loading={loading} handleSceneClick={handleSceneClick} />
            </Row>
          </div>
        </Fade>
      )
    } else if (!scenes && !loading && !loadingError) {
      return <NoContent container={container} onload={onload} />
    } else if (!scenes && !loading && loadingError) {
      return <LoadError container={container} onload={onload} />
    }
    return null
  }

  RenderScenes.propTypes = {
    onload: PropTypes.func,
    handleSceneClick: PropTypes.func
  }

  const { loading } = tours

  return (
    <>
      <RenderScenes
        onload={onload}
        handleSceneClick={handleSceneClick}
        showSceneTitle={showSceneTitle}
        showSceneDescription={showSceneDescription}
        showTourTitle={showTourTitle}
        showTourDescription={showTourDescription}

      />
      <Loading loading={loading} />
    </>
  )
}

SceneList.propTypes = {
  userId: PropTypes.string,
  planId: PropTypes.string,
  tourId: PropTypes.string,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  onload: PropTypes.func,
  preview: PropTypes.bool,
  handleSceneClick: PropTypes.func,
  showSceneTitle: PropTypes.bool,
  showTourTitle: PropTypes.bool,
  showTourDescription: PropTypes.bool,
  showSceneDescription: PropTypes.bool
}

SceneList.defaultProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 12,
  preview: false
}

export default SceneList
