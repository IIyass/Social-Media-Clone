import React from 'react';
import Login from './Auth/Login';
import RegisterForm from './Auth/RegisterForm';
import Header from './Layout/Header';
import Home from './Home';
import {Router,Route,Switch} from 'react-router-dom';
import history from './history';
import Footer from './Layout/Footer';
import Profils from './Profils/Profils';
import Search from './Layout/Search'
import SearchNotFound from './SearchNotFound';
import './app.css';

const App = ()=>{

  return(
      
  <div className="app">
    <Router history={history}>
      
   <div className="ui container" >
           <Header/>
           <Search/>

           <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/Register" exact component={RegisterForm}/>
                  <Route path="/Login" exact component={Login}/>
                  <Route path="/Profil/:UserId" exact component={Profils}/>
                  <Route path="/search" exact component={SearchNotFound}/>
                  
           </Switch>
           <Footer/>
         
  </div>
    </Router>
  </div>
      );
  
  };


export default App;
