import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom';
import {PATH} from "./components/common/Config";

import Bill from "./components/page/menu/Bill"
import Pool from "./components/page/menu/Pool"
import Server from "./components/page/menu/Server"
import User from "./components/page/menu/User"

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route path={PATH.BILL_PAGE} component={Bill} />
            <Route path={PATH.POOL_PAGE} component={Pool} />
            <Route path={PATH.SERVER_PAGE} component={Server} />
            <Route path={PATH.USER_PAGE} component={User} />
            <Route path='/' component={User} />
        </Switch>
    </HashRouter>
);
export default BasicRoute;
