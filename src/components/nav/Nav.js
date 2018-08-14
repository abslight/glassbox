import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class App extends Component {
    render() {
        return (
            <div>
                <Link to='/' exact>
                    Home
                </Link>
                <Link to='/inv'>
                    Inventory
                </Link>
                <Link to='/login'>
                    Login
                </Link>
            </div >
        );
    }
}

export default App;
