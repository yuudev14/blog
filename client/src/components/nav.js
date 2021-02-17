import {Link} from 'react-router-dom';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

const Nav = (props) => {
    const {isAuthenticate, setAuthenticate} = props;
    const logout = async() => {
        const loggingOut = await axios.post('/authentication/logout', {}, {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}})
        if(loggingOut){
          localStorage.removeItem('blogToken');
          setAuthenticate(false);
        }
      }
    return ( 
        <nav>
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
        </nav>
     );
}
 
export default withRouter(Nav);