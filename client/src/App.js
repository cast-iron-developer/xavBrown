import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { initLoadUser } from './actions/auth';
// import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { ParallaxProvider } from 'react-scroll-parallax';

// Components
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

import './assets/scss/style.scss';
import './assets/font/typography.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(initLoadUser());
  }, []);

  return (
    <ParallaxProvider>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </ParallaxProvider>
  )
}

export default App;
