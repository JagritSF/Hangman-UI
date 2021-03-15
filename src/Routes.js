/* 
  This file Contains the Routes for the Application
*/
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Game from './components/Game'

const Routes = () => (
  <HashRouter> 
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/game" component={Game} />
    </Switch>
  </HashRouter>
)

export default Routes;