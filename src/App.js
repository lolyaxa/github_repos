import React, { useState, useEffect } from 'react';
import './App.css';
import RepositoryPage from"./components/RepositoryPage.js";
import Home from"./components/Home.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

function App() {
  return (
    <div>
      <BrowserRouter history={history}>      
        <Switch>
          <Route exact path="/:id" component={RepositoryPage}/>
          <Route path="/" component={Home}/>
        </Switch>   
      </BrowserRouter> 
    </div>      
  );
}

export default App;
