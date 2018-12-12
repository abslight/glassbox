import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getInv } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import './Nav.css'
class App extends Component {
    constructor() {
        super();
        this.state = {
            inventory: []
        }
    }
    componentWillMount() {
        if (this.state.inventory.length === 0) {
            this.props.getInv()
            this.setState({ inventory: this.props.inventory })
        }
    }
    render() {
        return (
            <div id='nav'>
                <div>
                    <Link to='/' exact>
                        Home
                </Link>
                </div>
                <div>
                    <Link to='/inv'>
                        Inventory
                </Link>
                </div>
                <div>
                    <Link to='/login'>
                        Login
                </Link>
                </div>
            </div >
        );
    }
}
function mapStateToProps(state) {
    return {
        inventory: state.inventory
    }
}

export default connect(mapStateToProps, { getInv })(App);
