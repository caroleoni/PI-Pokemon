import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import CreatePokemon from './components/CreatePokemon';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path='/' element={< LandingPage />} />
        <Route path='/home' element={< Home />} />
        <Route path='/pokemons/:id' element={< Detail />} />
        <Route path='/pokemons' element={< CreatePokemon />} />
      </Routes>
    </div>  
    </BrowserRouter>
  );
}

export default App;
