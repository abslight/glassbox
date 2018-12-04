import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dash from './components/dash/Dash'
import InvList from './components/inv/InvList'
import Login from './components/login/Login'
import Profile from './components/profile/Profile'

export default (
    <Switch>
        <Route component={Dash} path='/' exact />
        <Route component={InvList} path='/inv' />
        <Route component={Login} path='/login' />
        <Route component={Profile} path='/profile/:id' exact />
    </Switch>
)