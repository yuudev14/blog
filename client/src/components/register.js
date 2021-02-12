import '../styles/login_register.scss';
import {Link} from 'react-router-dom';

const Register = () => {
    return ( 
        <div>
            <div className='registerForm'>
                <header>
                    <Link to='/'><h1>Blog</h1></Link>
                    <h3>Register</h3>
                </header>
                <form>
                    <label className='firstName'>
                        <input type='text' placeholder='First Name'/>
                    </label>
                    <label className='lastName'>
                        <input type='text' placeholder='Last Name'/>
                    </label>
                    <label className='email'>
                        <input type='text' placeholder='email'/>
                    </label>
                    <label className='password'>
                        <input type='password' placeholder='password' />
                    </label>
                    <input type='submit' className='submit'/>
                </form>
                <footer>
                    <p>Already have an account yet? <Link to='log-in'>log-in</Link></p>

                </footer>
            </div>
            
        </div>
     );
}
 
export default Register;