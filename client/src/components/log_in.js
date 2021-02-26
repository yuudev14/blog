import React, {useRef, useContext, useEffect, useState} from 'react';
// import '../styles/login_register.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { IS_AUTH } from '../context/isAuth';

const Log_in = (props) => {
    const email = useRef();
    const password = useRef();
    const {is_auth, is_auth_dispatch} = useContext(IS_AUTH);
    const [error, setError] = useState('');
    const login = async(e) => {
        e.preventDefault();
        const data = {
            email : email.current.value,
            password : password.current.value
        }
        try {
            const token = await axios.post('/authentication/login', data);
            if(token.status === 200){
                localStorage.setItem('blogToken',  JSON.stringify(token.data.blogtoken));
                is_auth_dispatch({type : 'IS_AUTH'})
                props.history.push('/');
            }else{
                console.log(token.data);
            }
            
        } catch (err) {
            setError(err.response.data)
        }
    }
    return ( 
        <div>
            <div className='loginForm'>
                <header>
                    <Link to='/'><h1>Blog</h1></Link>
                    <h3>Log-in</h3>
                </header>
                <form onSubmit={login}>
                    <label className='email'>
                        <input type='text' placeholder='email' ref={email}/>
                    </label>
                    <label className='password'>
                        <input type='password' placeholder='password' ref={password} />
                    </label>
                    <input type='submit' className='submit'/>
                </form>
                <footer>
                    <p>Don't have an account yet? <Link to='/register'>register</Link></p>

                </footer>
                {error !== '' && (
                    <div className='error'>
                        <i className='fa fa-exclamation-circle'></i>
                        <p>{error}</p>
                    </div>
                )}
                
            </div>
            
        </div>
     );
}
 
export default Log_in;