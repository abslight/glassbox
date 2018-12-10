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
        this.props.getInv().then(res => console.log(res));
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
        inv: state.inventory
    }
}

export default connect(mapStateToProps, { getInv })(App);
