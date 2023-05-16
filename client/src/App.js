import './App.css';
import React from 'react';
import { Route, BrowserRouter as Router,} from 'react-router-dom';
import LandingPage from './componentes/LandingPage/landingPage'
import Home from './componentes/Home/home'
import CreatePokemon from './componentes/CreatePokemon/createPokemon'
import Card from './componentes/Card/Card'


function App() {


  return (

    <div className="App">

      <Router>
        <Route exact path='/' render={() => <LandingPage />} />
        <Route exact path='/home' render={() => <Home />} />
        <Route exact path='/pokemon/:id' render={() => <Card />} />
        <Route exact path='/pokemon' render={() => <CreatePokemon />} />
      </Router>

    </div >

  );
}


export default App;
