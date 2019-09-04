import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import logo from './logo.svg';
import Modelfile from './components/modelfile2'
import Admin from './components/admin.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Modelfile} />
          <div className="container">
          <Route exact path="/admin" component={Admin} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
