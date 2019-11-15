import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Index from "../bill/Index"

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route path='/billPage/' component={Index}/>
        </Switch>
    </HashRouter>
);

export default BasicRoute;
