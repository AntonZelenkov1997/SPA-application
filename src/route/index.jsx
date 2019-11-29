import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Favorites from '../pages/Favorites';

const App = () => {
  const storage = JSON.parse(localStorage.getItem('storage'));
  const [isUserAutorisation, setUserAutorisation] = useState(false);

  useEffect(() => {
    if (storage) {
      storage.token ? setUserAutorisation(true) : setUserAutorisation(false);
    }
  }, [setUserAutorisation, storage]);

  return (
    <Router>
      <Switch>

        <Route exact path="/">
          {isUserAutorisation ? <Redirect to="/search" /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          {isUserAutorisation ? <Redirect to="/search" /> : null}
          <Login setUserAutorisation={setUserAutorisation} />
        </Route>

        <Route exact path="/search">
          {isUserAutorisation ? null : <Redirect to="/login" />}
          <Search setUserAutorisation={setUserAutorisation} />
        </Route>

        <Route exact path="/favorites">
          {isUserAutorisation ? <Favorites setUserAutorisation={setUserAutorisation} /> : <Redirect to="/login" />}
        </Route>

      </Switch>
    </Router>
  );
};

export default App;
