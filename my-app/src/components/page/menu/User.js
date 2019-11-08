import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Index from "../user/Index"
import Register from "../user/Register"
import Login from "../user/Login"

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route path='/userPage/register' component={Register}/>
            <Route path='/userPage/login' component={Login}/>
            <Route path='/userPage/' component={Index}/>
        </Switch>
    </HashRouter>
);

export default BasicRoute;
