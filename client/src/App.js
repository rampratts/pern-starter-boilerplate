import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserContext } from './components/UserContext';
import { verifyAuthentication } from './utils';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Secret from './components/Secret';
import Nav from './components/Nav';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogged, setIsLogged] = useContext(UserContext);

  const loadApp = () => {
    verifyAuthentication().then(userInfo => {
      setIsLogged(userInfo.auth)
      setIsLoaded(true);
    })
  }

  useEffect(() => {
    loadApp();
  }, [])

  if(!isLoaded) {
    return (<React.Fragment>Loading</React.Fragment>)
  } else {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path='/' component={Homepage}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <ProtectedRoute exact path='/secret' component={Secret}/>
          </Switch>
        </div>
      </Router>
    )
  }

}

export default App;
