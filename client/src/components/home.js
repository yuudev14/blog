import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Article from './articles';
import React,{useEffect, useRef} from 'react';
import Blog from './blog';

const Home = () => {
    const header = useRef();
    const openNav = () => {
      header.current.classList.toggle('openHeader');
    }
    return ( 
        <div className='Home'>
        <i class="fa fa-bars" onClick={openNav}></i>
        <header ref={header}>
          <nav>
            <Link to='/'><h1>Blog</h1></Link>
              <ul>
                <Link to='/log-in'><li>Log-in</li></Link>
                <Link to='/register'><li>Register</li></Link>
              </ul>
          </nav>
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
            <Route exact path='/' component={Article}/>
            <Route path='/:id' component={Blog} />
          </Router>
        </main>
      </div>
     );
}
 
export default Home;