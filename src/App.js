
import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
// import { useParams } from 'react-router-dom'
import PlanList from './components/PlanList'
import TourView from './components/TourView'
import './App.css'

var data = require('./data/data.json')

function App () {
  const [vrSRC, setVRSRC] = useState(null)
  const [vrOpen, setVROpen] = useState(false)

  useEffect(() => {
    const clientOverrides = document.getElementById('clientOverrides')
    const referrer = document.referrer
    console.log('referrer ius ', referrer)
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

  const openVR = (src) => {
    setVRSRC(src)
    setVROpen(true)
  }

  const columnSizes = () => {
    const urlParams = new URLSearchParams(window.location.search)
    let xs = urlParams.get('xs')
    let sm = urlParams.get('sm')
    let md = urlParams.get('md')
    let lg = urlParams.get('lg')
    let xl = urlParams.get('xl')

    xs = isNaN(parseInt(xs)) ? null : parseInt(xs)
    sm = isNaN(parseInt(sm)) ? null : parseInt(sm)
    md = isNaN(parseInt(md)) ? null : parseInt(md)
    lg = isNaN(parseInt(lg)) ? null : parseInt(lg)
    xl = isNaN(parseInt(xl)) ? null : parseInt(xl)

    const columnSizes = {}
    if (xs) columnSizes.xs = xs
    if (sm) columnSizes.sm = sm
    if (md) columnSizes.md = md
    if (lg) columnSizes.lg = lg
    if (xl) columnSizes.xl = xl
    return columnSizes
  }
  return (
    <Container fluid key='container'>
      <TourView
        src={vrSRC} open={vrOpen} onCancel={() => {
          setVROpen(false)
        }}
      />
      <PlanList data={data} openVR={openVR} {...columnSizes()} />
    </Container>
  )
}

export default App
