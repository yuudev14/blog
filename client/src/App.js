import {HashRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import './styles/home.scss';
import Home from './components/home';
import Log_in from './components/log_in';
import Register from './components/register';
import CreateBlog from './components/create_blog';
import React,{useEffect, useRef, useState} from 'react';
import axios from 'axios';
import IsAuth from './context/isAuth';


const App = (props) => {
  return (
    <div className="App">
      <Router>
        <IsAuth>
          <Switch>
            <Route exact path='/' render={(props) => <Home {...props} />} />
            <Route path='/dashboard' component={Home} />
            
            <Route path='/log-in' component={Log_in}  />
            <Route path='/register'  render={(props) => <Register {...props} />} />
            <Route path='/createBlog' render={(props) => <CreateBlog {...props} />} />
            <Route path='/updateBlog/:id' render={(props) => <CreateBlog {...props} />} />
            <Route path='/blog/:id' component={Home} />

          </Switch>
        </IsAuth>
        
        
        
      </Router>
      

    </div>
  );
}

export default withRouter(App);
