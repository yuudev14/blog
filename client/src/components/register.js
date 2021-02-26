import React, {useRef, useContext, useState} from 'react';
import '../styles/login_register.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { IS_AUTH } from '../context/isAuth';


const Register = (props) => {
    const first_name = useRef();
    const last_name = useRef();
    const email = useRef();
    const password = useRef();
    const retry_password = useRef();
    const {is_auth, is_auth_dispatch} = useContext(IS_AUTH);
    const [error, setError] = useState('');

    const register = async(e) => {
        e.preventDefault();
        const data = {
            first_name : first_name.current.value,
            last_name : last_name.current.value,
            email : email.current.value,
            password : password.current.value,
            retry_password : retry_password.current.value
        }
        try {
            const token = await axios.post('/authentication/register', data);
            console.log(token.data);
            if(token.status === 200){
                localStorage.setItem('blogToken',  JSON.stringify(token.data.blogtoken));
                [first_name, last_name, email, password, retry_password].forEach(ref => ref.current.value = '');
                is_auth_dispatch({type : 'IS_AUTH'})
                props.history.push('/');

            }else{
                console.log(token.data);
            } 
        } catch (error) {
            setError(error.response.data);
            
        }
        
        
    }
    return ( 
        <div>
            <div className='registerForm'>
                <header>
                    <Link to='/'><h1>Blog</h1></Link>
                    <h3>Register</h3>
                </header>
                <form onSubmit={register}>
                    <label className='firstName'>
                        <input type='text' ref={first_name} placeholder='First Name'/>
                    </label>
                    <label className='lastName'>
                        <input type='text' ref={last_name} placeholder='Last Name'/>
                    </label>
                    <label className='email'>
                        <input type='text' ref={email} placeholder='email'/>
                    </label>
                    <label className='password'>
                        <input type='password' ref={password} placeholder='password' />
                    </label>
                    <label className='retry_password'>
                        <input type='password' ref={retry_password} placeholder='retry_password' />
                    </label>
                    <input type='submit' className='submit'/>
                </form>
                <footer>
                    <p>Already have an account yet? <Link to='log-in'>log-in</Link></p>

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
 
export default Register;