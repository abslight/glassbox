import React, { Component } from 'react';
import { logOut } from './../../ducks/reducer'
import { connect } from 'react-redux'

class Profile extends Component {
    logout = () => {
        this.props.logOut()
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <button onClick={this.logout}>Log Out</button>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps, { logOut })(Profile);
