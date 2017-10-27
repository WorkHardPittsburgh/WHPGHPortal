import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';


import work from '../img/work-hard-logo.png';
import '../css/App.css';
import Nav from './Nav';
import Clients from './Clients';


class App extends Component {
  render() {
    return (
      <main>
        <Provider>
          <BrowserRouter>
            <div className="main-nav">
              <header className="app-header">
                <div className="wrap">
                  <img src={work} className="app-logo" alt="Work-Hard-Logo"/>
                  <Nav/>
                </div>
              </header>
              <Route path="/clients" component={Clients} />
            </div>
          </BrowserRouter>
        </Provider>
      </main>
    );
  }
}

// export default App;
