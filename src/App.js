import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EmployeePage from './pages/EmployeePage'
import Container from '@material-ui/core/Container'

const App = () => (
  <Router>
    <Container maxWidth="sm">
      <Route exact path="/" component={HomePage} />
      <Route path="/employees" component={EmployeePage} />
    </Container>
  </Router>
)

export default App
