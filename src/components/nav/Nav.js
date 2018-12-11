import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getInv } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
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
function mapStateToProps(state) {
    return {
        inventory: state.inventory
    }
}

export default connect(mapStateToProps, { getInv })(App);
