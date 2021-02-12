import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/home.scss';
import Home from './components/home';
import Log_in from './components/log_in';
import Register from './components/register';


const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          
          <Route path='/log-in' component={Log_in}/>
          <Route path='/register' component={Register}/>
          <Route path='/:id' component={Home} />

        </Switch>
        
        
      </Router>
      

    </div>
  );
}

export default App;
