import React from 'react'
import { Route, Switch } from 'react-router';
import Landing from './components/Landing/Landing'
import Main from './components/Main/Main';
import Form from './components/Form/Form';

export default function Routes() {
    return (
        <Switch onChange={window.scrollTo(0, 0)}>
            <Route exact path='/' component={Landing} />
            <Route path='/main' component={Main} />
            <Route path='/form' component={Form} />
        </Switch>
    )
}