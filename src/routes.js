import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dash from './components/dash/Dash'
import Inv from './components/inv/Inv'

export default (
    <Switch>
        <Route component={Dash} path='/' exact />
        <Route component={Inv} path='/inv' />
    </Switch>
)