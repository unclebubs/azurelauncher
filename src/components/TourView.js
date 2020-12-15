import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { Col, Row, Modal, Button, Fade } from 'react-bootstrap'
import { isIOS } from 'react-device-detect'
import { FaTimes } from '@react-icons/all-files/fa/FaTimes'
import { FaExpand } from '@react-icons/all-files/fa/FaExpand'
// const testTour = 'https://virtualtour-e847f.web.app/vr/index.html?userId=zaJbATKfpXToPLTjmARndxoUHo63&planId=-MMV7a5HZ4eyn5SOPbfJ&tourId=-MMfBlY3EB4dI4WC0B4f'

function TourView ({ src, open, onCancel }) {
  const [iFrameLoaded, setIFrameLoaded] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [iFrameHeight, setIFrameHeight] = useState(0)
  const handle = useFullScreenHandle()
  const iFrameRef = useRef(null)

  window.addEventListener('resize', () => {
    setIFrameHeight(window.innerHeight)
  })
  window.addEventListener('orientationchange', () => {
    setIFrameHeight(window.innerHeight)
  })

  const handleEnterFullScreen = () => {
    setIsFullScreen(true)
    handle.enter()
  }

  const handleExitFullScreen = () => {
    setIsFullScreen(false)
    handle.exit()
  }

  const renderFullScreenButton = () => {
    if (isIOS) return null
    return (
      <Button
        className='round-button mr-3'
        variant='outline-dark'
        onClick={() => {
          isFullScreen ? handleExitFullScreen() : handleEnterFullScreen()
        }}
      >
        <FaExpand color='white' />
      </Button>
    )
  }

  return (
    <Modal
      id='vrModal'
      dialogClassName='full-width-dialog'
      show={open}
      size='lg'
      centered
      onEntered={() => {
        setIFrameHeight(window.innerHeight)
      }}
    >
      <FullScreen handle={handle}>
        <Fade in={iFrameLoaded}>
          <Row style={{ position: 'absolute', right: 20, top: 30 }}>
            <Col className='d-flex flex-row-reverse'>
              <Button
                className='round-button'
                variant='outline-dark'
                onClick={() => {
                  setIFrameLoaded(false)
                  onCancel()
                }}
              >
                <FaTimes color='white' />
              </Button>
              {renderFullScreenButton()}
            </Col>
          </Row>
        </Fade>
        <iframe
          onLoad={() => {
            setIFrameLoaded(true)
          }}
          ref={iFrameRef} title='test' style={{ border: 0, width: '100%', height: iFrameHeight }} src={src}
        />
      </FullScreen>
    </Modal>
  )
}

TourView.propTypes = {
  src: PropTypes.string,
  open: PropTypes.bool,
  onCancel: PropTypes.func

}

export default TourView
