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
    const [popularBlogs, setPopularBlogs] = useState([]);

    useEffect(async() => {
      try {
        const blogs = await axios.get('/blogs/popular_blogs');
        console.log(blogs.data);
        setPopularBlogs(blogs.data);
        
      } catch (err) {
        console.log(err.response.data);
        
      }

    }, [])
    
    return ( 
        <div className='Home'>
        <i class="fa fa-bars menu" onClick={openNav}></i>
        <header ref={header}>
          <Nav/>
          <div className='popular_blogs'>
            <h2>Popular Blogs</h2>
            {popularBlogs.map(blog => (
              <Link to={`/blog/${blog.blog_id}`}>
                <div className='article'>
                  <div className='article_preview_img'></div>
                  <h5>{blog.title}</h5>
                </div>
              </Link>
            
            ))}
          </div>
          <footer>

          </footer>
        </header>
        <main>
          <Router>
            <Switch>
              <Route exact path='/' component={Article}/>
              <Route path='/dashboard' render={(props => (<Dashboard {...props} setPopularBlogs={setPopularBlogs}/>))} />
              <Route path='/blog/:id' component={Blog} />
            </Switch>
            
            
          </Router>
        </main>
      </div>
     );
}
 
export default Home;