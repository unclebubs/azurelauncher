
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Container, Fade } from 'react-bootstrap'
import { Provider } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import store from './store/Store'
import PlanList from './components/PlanList'
import './App.css'
import { IoIosCloseCircleOutline } from '@react-icons/all-files/io/IoIosCloseCircleOutline'

function App ({ appContainer }) {
  const containerRef = useRef()
  const frameContainer = useRef()
  const frame = useRef()
  const [tourListActive, setTourListActive] = useState(true)
  const [vrActive, setVRActive] = useState(false)
  const [vrButtonActive, setVRButtonActive] = useState(false)
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
    // const appContainer = document.getElementById('root')
    console.log('elements', appContainer)
    const xs = parseColParam(appContainer, 'data-xs')
    const sm = parseColParam(appContainer, 'data-sm')
    const md = parseColParam(appContainer, 'data-md')
    const lg = parseColParam(appContainer, 'data-lg')
    const xl = parseColParam(appContainer, 'data-xl')

    const params = {}
    if (xs) params.xs = xs
    if (sm) params.sm = sm
    if (md) params.md = md
    if (lg) params.lg = lg
    if (xl) params.xl = xl

    params.userId = appContainer.getAttribute('data-userId')
    params.planId = appContainer.getAttribute('data-planId')
    params.tourId = appContainer.getAttribute('data-tourId')
    params.showPlanTitle = appContainer.getAttribute('data-showPlanTitle') === 'true'
    params.showPlanDescription = appContainer.getAttribute('data-showPlanDescription') === 'true'
    params.showTourTitle = appContainer.getAttribute('data-showTourTitle') === 'true'
    params.showTourDescription = appContainer.getAttribute('data-showTourDescription') === 'true'

    params.preview = appContainer.getAttribute('data-preview') === 'true'

    return params
  }

  const parseColParam = (appContainer, param) => {
    if (isMobileOnly) {
      return 12
    }
    const paramValue = appContainer.getAttribute(param)
    let numericParamValue = isNaN(parseInt(paramValue)) ? 12 : parseInt(paramValue)
    numericParamValue = numericParamValue > 12 ? 12 : numericParamValue
    return numericParamValue
  }

  const handlePlanClick = ({ userId, planId, tourId }) => {
    setUserId(userId)
    setPlanId(planId)
    setTourId(tourId)
    setTourListActive(false)
    setVRActive(true)
    setVRButtonActive(true)
  }

  return (
    <Provider store={store}>
      <Container style={styles.container} ref={containerRef} fluid key='container'>
        <Fade in={tourListActive} mountOnEnter>
          <PlanList {...params()} handlePlanClick={handlePlanClick} />
        </Fade>
        <div ref={frameContainer} style={vrActive ? styles.frameContainerStylesOn : styles.frameContainerStylesOff}>
          <div style={vrButtonActive ? styles.buttonContainerOn : styles.buttonContainerOff}>
            <button
              style={styles.button}
              onClick={() => {
                setVRActive(false)
                setVRButtonActive(false)
                setTourListActive(true)
              }}
              onTouchEnd={() => {
                setVRActive(false)
                setVRButtonActive(false)
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
      </Container>
    </Provider>
  )
}

const styles = {
  container: {
    padding: 0,
    margin: 0
  },
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
    transition: 'opacity 0.3s ease-in',
    zIndex: '99999999999'
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
    transition: 'all  0.3s ease-out',
    zIndex: '99999999999'

  },

  buttonContainerOn: {
    position: 'absolute',
    opacity: 1,
    top: '15px',
    right: '20px',
    float: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s ease-in 1s'
  },
  buttonContainerOff: {
    position: 'absolute',
    opacity: 0,
    top: '15px',
    right: '20px',
    float: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.1s ease-out '
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
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    border: 'none',
    backgroundColor: 'inherit',
    width: '100%',
    height: '100vh'
  }
}

App.propTypes = {
  appContainer: PropTypes.object
}

export default App
