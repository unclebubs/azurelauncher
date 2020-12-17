
import React, { useState, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import store from './store/Store'
import PlanList from './components/PlanList'
import TourView from './components/TourView'
import './App.css'

function App () {
  const [vrSRC, setVRSRC] = useState(null)
  const [vrOpen, setVROpen] = useState(false)
  const [vrHeight, setVRHeight] = useState(0)
  const [offsetTop, setOffsetTop] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const containerRef = useRef(null)
  // get the viewport height
  window.parent.postMessage({
    requestViewPortHeight: true
  }, '*')

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
    updateFrameHeight()
  }, [vrHeight])

  const openVR = (src, offsetTop) => {
    setOffsetTop(isMobileOnly ? offsetTop : 0)
    setVRSRC(src)
    setVROpen(true)
    window.parent.postMessage({
      scrollTo: true
    }, '*')
  }

  const closeVR = () => {
    setVRSRC(null)
    setVROpen(false)
  }

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

    return params
  }

  const parseColParam = (param) => {
    if (isMobileOnly) {
      return 1
    }
    const urlParams = new URLSearchParams(window.location.search)
    const paramValue = urlParams.get('param')
    return isNaN(parseInt(paramValue)) ? null : parseInt(paramValue)
  }

  const updateFrameHeight = () => {
    if (containerRef.current !== null) {
      let height = containerRef.current.offsetHeight

      if (vrOpen) {
        const width = containerRef.current.offsetWidth
        let minRequiredHeight = (width / 2)
        if (isMobileOnly) {
          minRequiredHeight = viewportHeight * 0.9 // ensure room to scroll if needed
        } else if (minRequiredHeight > viewportHeight * 0.9) {
          minRequiredHeight = viewportHeight * 0.9
        }
        setVRHeight(minRequiredHeight)
        height = Math.max(height, minRequiredHeight)
      }
      window.parent.postMessage({
        frameHeight: height
      }, '*')
    }
  }

  window.onmessage = (e) => {
    if (e.data.viewportHeight) {
      console.log('ViewportHeight updated to ', e.data.viewportHeight)
      setViewportHeight(e.data.viewportHeight)
    }
  }

  window.addEventListener('resize', () => {
    updateFrameHeight()
  })
  window.addEventListener('orientationchange', () => {
    updateFrameHeight()
  })

  return (
    <Provider store={store}>
      <Container
        ref={containerRef} fluid key='container'
      >
        <TourView
          src={vrSRC} offsetTop={offsetTop} height={vrHeight} open={vrOpen} onCancel={() => {
            closeVR()
          }}
        />
        <PlanList openVR={openVR} {...params()} onload={updateFrameHeight} />
      </Container>
    </Provider>
  )
}

export default App
