import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import './index.css';

import Tasks from './components/Tasks';

import Uptakes from './components/Uptakes';
import CreateUptake from './components/Uptake_Create';

import Projects from './components/Projects';

// import App from './components/App';
import reducers from './reducers';
import Clients from './components/Clients';
import EditClient from './components/Client_Edit';
import CreateClient from './components/Client_Create';



import work from './img/work-hard-logo.png';
import './css/App.css';
import Nav from './components/Nav';

import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// const store = createStore(
//     reducers,
//     applyMiddleware(thunk)
// );

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div className="main-nav">
                <header className="app-header">
                    <div className="wrap">
                        <img src={work} className="app-logo" alt="Work-Hard-Logo"/>
                        <Nav/>
                    </div>
                </header>
                <Switch>
                    <Route path="/uptakes/new" component={CreateUptake} />
                    <Route path="/uptakes" component={Uptakes} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/clients/new" component={CreateClient} />
                    <Route path="/clients/:id" component={EditClient} />
                    <Route path="/clients" component={Clients} />
                    <Route path="/tasks" component={Tasks} />

                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
