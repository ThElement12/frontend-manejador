import React from 'react';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import PaginaMovimiento from './components/PageMovimiento';
import PaginaOrdenes from './components/PaginaOrdenes';
class App extends React.Component {

  render() {
    return(
      <Router>
        <Switch>
          <Route exact path='/' render={
            (props) => {
              return <PaginaMovimiento/>
            }
          }/>
          <Route exact path='/ordenes' render={
            (props) => {
              return <PaginaOrdenes/>
            }
          }/>
        </Switch>
      </Router>
    )
  }
}


export default App;
