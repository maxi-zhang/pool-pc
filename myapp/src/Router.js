import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom';

import App from "./App"
import Bill from "./components/page/menu/Bill"
import Pool from "./components/page/menu/Pool"
import Server from "./components/page/menu/Server"
import User from "./components/page/menu/User"

const BasicRoute = () => (
    <div id="main">
        <HashRouter>
            <Switch>
                <Route path='/app' component={App}/>
                <Route path='/billPage' component={Bill} />
                <Route path='/poolPage' component={Pool} />
                <Route path='/serverPage' component={Server} />
                <Route path='/userPage' component={User} />
                <Route path='/' component={User} />
            </Switch>
        </HashRouter>
    </div>
);
export default BasicRoute;
