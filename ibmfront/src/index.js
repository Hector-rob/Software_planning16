import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom'


ReactDOM.render(
  <ThemeProvider theme={theme}>
  <App/>
  </ThemeProvider>, document.querySelector('#root')
)

/* render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
) */