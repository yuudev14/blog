import React,{useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Home}/>
      </Router>

    </div>
  );
}

export default App;
