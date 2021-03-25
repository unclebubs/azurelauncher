
import React, { useEffect, useRef, useState } from 'react'
import { Container, Fade } from 'react-bootstrap'
import { Provider } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import store from './store/Store'
import PlanList from './components/PlanList'
import './App.css'
import { IoIosCloseCircleOutline } from '@react-icons/all-files/io/IoIosCloseCircleOutline'
import DynamicPortal from './portal/DynamicPortal'

function App () {
  const containerRef = useRef()
  const frameContainer = useRef()
  const frame = useRef()
  const [tourListActive, setTourListActive] = useState(true)
  const [vrActive, setVRActive] = useState(false)
  const [userId, setUserId] = useState()
  const [planId, setPlanId] = useState()
  const [tourId, setTourId] = useState()

  useEffect(() => {
    if (vrActive) {
      window.top.document.documentElement.style.overflow = 'hidden'
      window.top.document.body.scroll = 'no'
    } else {
      window.top.document.documentElement.style.overflow = 'scroll'
      window.top.document.body.scroll = 'yes'
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
    params.showPlanTitle = urlParams.get('showPlanTitle') === 'true'
    params.showPlanDescription = urlParams.get('showPlanDescription') === 'true'
    params.showTourTitle = urlParams.get('showTourTitle') === 'true'
    params.showTourDescription = urlParams.get('showTourDescription') === 'true'

    params.preview = urlParams.get('preview') === 'true'

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
    setVRActive(true)
  }

  return (
    <Provider store={store}>
      <Container ref={containerRef} fluid key='container'>
        <Fade in={tourListActive} mountOnEnter>
          <PlanList {...params()} handlePlanClick={handlePlanClick} />
        </Fade>
        <DynamicPortal style='position: fixed; top: 0px; left: 0px;' container={window.top.document.body} containerId='vrPortal'>
          <div ref={frameContainer} style={vrActive ? styles.frameContainerStylesOn : styles.frameContainerStylesOff}>
            <div style={styles.buttonContainer}>
              <button
                style={styles.button}
                onClick={() => {
                  setVRActive(false)
                  setTourListActive(true)
                }}
                onTouchEnd={() => {
                  setVRActive(false)
                  setTourListActive(true)
                }}
              >
                <IoIosCloseCircleOutline color='rgba(255, 255, 255)' size={36} />
              </button>
            </div>
            <iframe
              ref={frame}
              src={`https://app.azure-vr.com/index.html?userId=${userId}&planId=${planId}&tourId=${tourId}`}
              style={styles.frame}
              id='tour-MWUalNu0gI7lIRHTYz7' referrerpolicy='origin' scrolling='no'
            />
          </div>
        </DynamicPortal>
      </Container>
    </Provider>
  )
}

const styles = {
  frameContainerStylesOn: {
    height: '100vh',
    width: '100%',
    opacity: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease-in'
  },
  frameContainerStylesOff: {
    height: 0,
    width: 0,
    opacity: 0,
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all  0.3s ease-out'

  },

  buttonContainer: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    float: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: 'inherit',
    width: '100%',
    height: '100vh'
  }
}

export default App
