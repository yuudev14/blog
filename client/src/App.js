import {HashRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import './styles/home.scss';
import Home from './components/home';
import Log_in from './components/log_in';
import Register from './components/register';
import CreateBlog from './components/create_blog';
import React,{useEffect, useRef, useState} from 'react';
import axios from 'axios';


const App = (props) => {
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    console.log(props);

    const isAuth = async(setIsAuthenticate) => {
      if(JSON.parse(localStorage.getItem('blogToken'))){
        try{
          const is_auth = await axios.get('/dashboard/isVerify', {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}})
          if(is_auth){
            setIsAuthenticate(true);
          }else{
            setIsAuthenticate(false);
            props.history.push('/')
          }
        }catch(err){
          console.log(err);
          setIsAuthenticate(false);
          props.history.push('/')
        }
      }else{
        setIsAuthenticate(false);
        props.history.push('/')
      }
    }

    useEffect(async() => {
      isAuth(setIsAuthenticate)
    }, []);

    const setAuthenticate = (bool) => {
      setIsAuthenticate(bool)
    }


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} isAuthenticate={isAuthenticate} setAuthenticate={setAuthenticate} />} />
          
          <Route path='/log-in' render={(props) => <Log_in {...props} setAuthenticate={setAuthenticate}/> } />
          <Route path='/register'  render={(props) => <Register {...props} setAuthenticate={setAuthenticate}/>} />
          <Route path='/createBlog' render={(props) => <CreateBlog {...props} setAuthenticate={setAuthenticate} isAuthenticate={isAuthenticate} setIsAuthenticate={setIsAuthenticate} isAuth={isAuth}/>} />
          <Route path='/:id' render={(props) => <Home {...props}/>} />

        </Switch>
        
        
      </Router>
      

    </div>
  );
}

export default withRouter(App);
