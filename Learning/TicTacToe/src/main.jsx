import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './Board.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode className="principal" >
    <Game/>
  </StrictMode>,
)
