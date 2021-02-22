import {Link} from 'react-router-dom';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import React, {useContext, useState} from 'react';
import { IS_AUTH } from '../context/isAuth';

const Nav = (props) => {
    const {is_auth, is_auth_dispatch} = useContext(IS_AUTH);
    
    console.log(is_auth);
    const logout = async() => {
        const loggingOut = await axios.post('/authentication/logout', {}, {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}})
        if(loggingOut){
          localStorage.removeItem('blogToken');
          is_auth_dispatch({type : 'NOT_AUTH'})
        }
      }
    return ( 
        <nav>
            <Link to='/'><h1>Blog</h1></Link>
            <ul>
            {is_auth ? (
                <>
                {props.location.pathname !== '/createBlog' && (
                    <Link to='/createBlog'><li>Create Blog</li></Link>
                )}
                
                <Link to='/dashboard'><li>Dashboard</li></Link>
                <li onClick={logout}>Log-out</li>
                </>
            ) : (
                <>
                <Link to='/log-in'><li>Log-in</li></Link>
                <Link to='/register'><li>Register</li></Link>
                </>
            )}
            
            </ul>
        </nav>
     );
}
 
export default withRouter(Nav);