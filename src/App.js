
import React, { useEffect, useRef, useState } from 'react'
import { Container, Fade } from 'react-bootstrap'
import { Provider } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import store from './store/Store'
import PlanList from './components/PlanList'
import './App.css'
import { IoIosCloseCircleOutline } from '@react-icons/all-files/io/IoIosCloseCircleOutline'

function App () {
  const containerRef = useRef()
  const frameContainer = useRef()
  const frame = useRef()
  const [tourListActive, setTourListActive] = useState(true)
  const [vrActive, setVRActive] = useState(false)
  const [vrActiveShowButton, setVrActiveShowButton] = useState(false)
  const [userId, setUserId] = useState()
  const [planId, setPlanId] = useState()
  const [tourId, setTourId] = useState()

  useEffect(() => {
    if (vrActive) {
      document.documentElement.style.overflow = 'hidden'
      document.body.scroll = 'no'
    } else {
      document.documentElement.style.overflow = 'scroll'
      document.body.scroll = 'yes'
    }
  }
  , [vrActive])

  useEffect(() => {
    const clientOverrides = document.getElementById('clientOverrides')
    const referrer = document.referrer
    if (!clientOverrides && referrer) {
      var head = document.head
      var link = document.createElement('link')
      link.id = 'clientOverrides'
      link.type = 'text/css'
      link.rel = 'stylesheet'
      link.href = `${referrer}/client-overrides.css`

      head.appendChild(link)
    }
    // updateFrameHeight()
  })

  const params = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const xs = parseColParam('xs')
    const sm = parseColParam('sm')
    const md = parseColParam('md')
    const lg = parseColParam('lg')
    const xl = parseColParam('xl')

    const params = {}
    if (xs) params.xs = xs
    if (sm) params.sm = sm
    if (md) params.md = md
    if (lg) params.lg = lg
    if (xl) params.xl = xl

    params.userId = urlParams.get('userId')
    params.planId = urlParams.get('planId')
    params.tourId = urlParams.get('tourId')

    params.preview = !!urlParams.get('preview')

    return params
  }

  const parseColParam = (param) => {
    if (isMobileOnly) {
      return 12
    }
    const urlParams = new URLSearchParams(window.location.search)
    const paramValue = urlParams.get(param)
    return isNaN(parseInt(paramValue)) ? null : parseInt(paramValue)
  }

  const handlePlanClick = ({ userId, planId, tourId }) => {
    setUserId(userId)
    setPlanId(planId)
    setTourId(tourId)
    setTourListActive(false)
  }
  const handleTourListExited = () => {
    setVRActive(true)
    setTimeout(() => {
      setVrActiveShowButton(true)
    }, 2000)
  }

  const handleVRExited = () => {
    setTourListActive(true)
  }

  return (
    <Provider store={store}>
      <Container ref={containerRef} fluid key='container'>
        <Fade in={tourListActive} mountOnEnter onExited={handleTourListExited}>
          <PlanList {...params()} handlePlanClick={handlePlanClick} />
        </Fade>
        <Fade in={vrActive} unmountOnExit mountOnEnter onExited={handleVRExited}>
          <div className='vh-100 w-100' ref={frameContainer} style={styles.frameContainerStyles}>
            <div
              className='d-flex justify-content-center align-items-center' style={styles.buttonContainer}
            >
              <Fade in={vrActiveShowButton}>
                <button
                  style={styles.button}
                  onClick={() => {
                    setVRActive(false)
                    setVrActiveShowButton(false)
                  }}
                  onTouchEnd={() => {
                    setVRActive(false)
                    setVrActiveShowButton(false)
                  }}
                >
                  <IoIosCloseCircleOutline color='rgba(255, 255, 255)' size={36} />
                </button>
              </Fade>
            </div>
            <iframe
              ref={frame}
              className='vh-100 w-100'
              src={`https://app.azure-vr.com/index.html?userId=${userId}&planId=${planId}&tourId=${tourId}`}
              style={styles.frame}
              id='tour-MWUalNu0gI7lIRHTYz7' referrerpolicy='origin' scrolling='no'
            />

          </div>
        </Fade>

      </Container>
    </Provider>
  )
}

const styles = {
  frameContainerStyles: { position: 'fixed', top: 0, left: 0 },
  buttonContainer: {
    position: 'relative',
    top: '15px',
    right: '20px',
    float: 'right'
  },
  button: {
    height: '40px',
    width: '40px',
    borderRadius: '40px',
    border: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: '999999',
    padding: 0
  },
  frame: {
    position: 'relative',
    top: '-40px',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    border: 'none',
    backgroundColor: 'inherit'
  }
}

export default App
