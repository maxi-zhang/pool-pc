import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import {PATH} from "../../common/Config";
import Index from "../user/Index"
import Register from "../user/Register"
import Login from "../user/Login"

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route path={PATH.USER_REGISTER} component={Register}/>
            <Route path={PATH.USER_LOGIN} component={Login}/>
            <Route path={PATH.USER_PAGE} component={Index}/>
            <Route path={PATH.HOME_INDEX} component={Index}/>
        </Switch>
    </HashRouter>
);

export default BasicRoute;
