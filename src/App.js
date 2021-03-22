
import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import store from './store/Store'
import PlanList from './components/PlanList'
import './App.css'

function App () {
  const containerRef = useRef(null)

  const getFrameId = () => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('frameId')
  }

  const frameId = getFrameId()

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

    params.preview = !!urlParams.get('preview')

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
      const height = containerRef.current.offsetHeight
      window.parent.postMessage({
        frameHeight: height,
        frameId
      }, '*')
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
      <Container ref={containerRef} fluid key='container'>
        <PlanList {...params()} onload={updateFrameHeight} />
      </Container>
    </Provider>
  )
}

export default App
