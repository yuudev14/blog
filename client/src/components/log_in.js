import '../styles/login.scss';

const Log_in = () => {
    return ( 
        <div>
            <div className='loginForm'>
                <header>
                    <h1>Blog</h1>
                    <h3>Log-in</h3>
                </header>
                <form>
                    <label>
                        <input type='text' />
                    </label>
                    <label>
                        <input type='password' />
                    </label>
                    <input type='submit' />
                </form>
                <footer>

                </footer>
            </div>
            
        </div>
     );
}
 
export default Log_in;