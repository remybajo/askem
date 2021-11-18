import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css"

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import token from "./reducers/token";
import commentairesList from "./reducers/comments";
import PageProfil from "./pageprofil";
import Accueil from "./Accueil";
import Profilcomp from "./profilcomp";
import nouvelPublication from "./nouvelPublication";
import Publication from "./publication";
import PageTheme from "./PageTheme";
import Validation from "./validation";
import SideBarDroite from "./Components/SideBarDroite";
import pageStat from "./pageStat";
import piedDePage from "./Components/piedDePage";


//import Cookies from 'js-cookie';

const store = createStore(combineReducers({ token, commentairesList}));

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={Accueil} path="/" exact />
         <Route component= {Validation} path="/validation/:email" exacte />
          <Route component={pageStat} path="/pageStat" exact />
          <Route component={PageProfil} path="/pageprofil" exact />
          <Route component={Profilcomp} path="/profilcomp" exact />
          <Route component={Publication} path="/publication/:id" exact />
          <Route component={nouvelPublication} path="/nouvelPublication" exact/>
          <Route component={SideBarDroite} path="/SideBarDroite" exact />
          <Route component={PageTheme} path="/pageTheme/:theme" exact />
          <Route component={piedDePage} path="/piedDePage" exact />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
