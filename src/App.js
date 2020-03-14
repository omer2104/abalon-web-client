import React, { useReducer } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AbalonGamePage from './components/AbalonGamePage/AbalonGamePage'
import StartPage from './components/StartPage/StartPage'
import { AppRoutes } from './constants'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={AppRoutes.startPage} render={(props) => <StartPage {...props} />} />
        <Route exact path={AppRoutes.abalonGamePage} render={(props) => <AbalonGamePage {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
