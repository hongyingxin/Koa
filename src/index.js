import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter
} from 'react-router-dom'
import App from './app'

const rootElement = document.getElementById('app')

console.log(render)


render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
)
