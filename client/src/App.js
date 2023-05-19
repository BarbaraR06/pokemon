import './App.css';
import React from 'react';
import { Route, BrowserRouter as Router,} from 'react-router-dom';
import LandingPage from './componentes/LandingPage/landingPage'
import Home from './componentes/Home/Home'
import CreatePokemon from './componentes/CreatePokemon/CreatePokemon'
import Detail from './componentes/Detail/Detail';

function App() {

  return (

    <div className="App">

      <Router>
        <Route exact path='/' render={() => <LandingPage />} />
        <Route path='/home' render={() => <Home />} />
        <Route path='/pokemons/:id' render={() => <Detail />} />
        <Route path='/pokemon' render={() => <CreatePokemon />} />
      </Router>

    </div >

  );
}


export default App;
