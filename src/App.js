import React, { Component } from 'react';
import routes from './routes'
import Nav from './components/nav/Nav'
class App extends Component {
  render() {
    return (
      < div className="App" >
        <Nav />
        {routes}
      </div >
    );
  }
}

export default App;
