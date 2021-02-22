import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Article from './articles';
import React,{useEffect, useRef, useState} from 'react';
import Blog from './blog';
import axios from 'axios';
import Nav from './nav';
import Dashboard from './dashboard';

const Home = (props) => {
    
    const header = useRef();
    const openNav = () => {
      header.current.classList.toggle('openHeader');
    }
    
    return ( 
        <div className='Home'>
        <i class="fa fa-bars menu" onClick={openNav}></i>
        <header ref={header}>
          <Nav/>
          {/* <nav>
            <Link to='/'><h1>Blog</h1></Link>
              <ul>
                {isAuthenticate ? (
                  <>
                    <Link to='/createBlog'><li>Create Blog</li></Link>
                    <li onClick={logout}>Log-out</li>
                  </>
                ) : (
                  <>
                    <Link to='/log-in'><li>Log-in</li></Link>
                    <Link to='/register'><li>Register</li></Link>
                  </>
                )}
                
              </ul>
          </nav> */}
          <div className='popular_blogs'>
            <h2>Popular Blogs</h2>
            <div className='article'>
              <div className='article_preview_img'></div>
              <h5>The importance of good hobbies</h5>
            </div>
            <div className='article'>
              <div className='article_preview_img'></div>
              <h5>The importance of good hobbies</h5>
            </div>
            <div className='article'>
              <div className='article_preview_img'></div>
              <h5>The importance of good hobbies</h5>
            </div>
            <div className='article'>
              <div className='article_preview_img'></div>
              <h5>The importance of good hobbies</h5>
            </div>
            

          </div>
          <footer>

          </footer>
        </header>
        <main>
          <Router>
            <Switch>
              <Route exact path='/' component={Article}/>
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/blog/:id' component={Blog} />
            </Switch>
            
            
          </Router>
        </main>
      </div>
     );
}
 
export default Home;