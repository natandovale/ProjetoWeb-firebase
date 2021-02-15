import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Despesa from './components/Despesa';
import Receita from './components/Receita';
import Menu from './components/Menu';
import ListaReceita from './components/ListaReceita';
import ListaDespesa from './components/ListaDespesa';


function App() {
  return (
    <div className='container'>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path='/' component={Inicio}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/receita' component={Receita}></Route>
          <Route exact path='/despesa' component={Despesa}></Route>
          <Route exact path='/receita/listareceita' component={ListaReceita}></Route>
          <Route exact path='/despesa/listardespesa' component={ListaDespesa}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
