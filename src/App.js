import React, { Component } from 'react';
import Routes from './routes'
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        {Routes()}
        <nav id='nav'>
          <span><Link to='/'>Landing</Link></span>
          <span><Link to='/main'>Main</Link></span>
          <span><Link to='/form'>Search</Link></span>


        </nav>
      </div>
    );
  }
}

export default App;
