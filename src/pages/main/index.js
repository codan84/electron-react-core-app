import React from 'react'
import styled from 'styled-components'

import withState from '../with-state'

const render = ({className, match}) => (
  <div className={className}>
    Hello there folks :)
  </div>
)

const initialState = {}

const Main = styled(withState(initialState, render))`
  color: red;
`

export default Main
