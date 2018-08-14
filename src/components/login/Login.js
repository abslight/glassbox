import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateUser } from '../../ducks/reducer'
class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            error: '',
            loggedIn: '',
            register: false,
            redirectID: undefined,
        }
    }

    login() {
        const { email, password } = this.state
        if (email && password) {
            axios.post('/login', { email, password }).then(res => {
                if (res.data.length !== 0) {
                    // this.setState({ error: '' })
                    this.setState({ loggedIn: 'You logged in successfully!', error: '', redirectID: res.data.userID });
                    this.props.updateUser(res.data);
                    this.props.loginToggleFn();
                    this.props.menuProfile(!this.props.profToggle);
                } else if (res.data === 'Invalid Password') {
                    this.setState({ error: 'Invalid Password' })
                } else if (res.data === 'User does not exist') {
                    this.setState({ error: 'User does not exist' })
                } else if (res.data.length === 0) {
                    this.setState({ error: 'Please fill in both fields' })
                }
            })
        }
    }
    register() {
        const { username, email, password } = this.state
        if (username && email && password) {
            axios.post('/register', { username, email, password }).then(res => {
                if (res.data.length === 0) {
                    this.setState({ error: 'Please fill in all fields' })
                } else if (res.data === 'email taken. Try another.') {
                    this.setState({ error: 'Email taken. Please try another.' })
                }
                else {
                    this.setState({ loggedIn: 'You are now registered and have logged in successfully!', error: '', redirectID: res.data.userID });
                    this.props.updateUser(res.data);
                    this.props.loginToggleFn();
                    this.props.menuProfile(!this.props.profToggle);
                }
            }
            )
        }
    }

    toggleReg() {
        this.setState({ register: !this.state.register });
    }
    render() {
        let { redirectID } = this.state;
        console.log(this.props)
        if (redirectID) {
            return (
                <Redirect to={`/profile/${redirectID}`} />
            )
        } else if (this.state.register === false) {
            return (
                <div>
                    <h3>Email</h3>
                    <input onChange={e => this.setState({ email: e.target.value })} />
                    <h3>Password</h3>
                    <input onChange={e => this.setState({ password: e.target.value })} type='password' />
                    <br />
                    <br />
                    <h6 onClick={() => this.toggleReg()}>Not a member?</h6>
                    <button className='loginbtn' onClick={() => this.login()}>Login</button>
                    <h4>{this.state.error}</h4>
                    <h2>{this.state.loggedIn}</h2>
                </div>
            );
        } else {
            return (
                <div>
                    <h3>Username</h3>
                    <input onChange={e => this.setState({ username: e.target.value })} />
                    <h3>Email</h3>
                    <input onChange={e => this.setState({ email: e.target.value })} />
                    <h3>Password</h3>
                    <input onChange={e => this.setState({ password: e.target.value })} type='password' />
                    <br />
                    <br />
                    <h6 onClick={() => this.toggleReg()}>Already a member?</h6>
                    <button className='loginbtn' onClick={() => this.register()}>Register</button>
                    <h4>{this.state.error}</h4>
                    <h2>{this.state.loggedIn}</h2>
                </div>
            )
        }
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps, { updateUser })(Login);