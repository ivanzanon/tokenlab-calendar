import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from "./pages/login";
import Main from "./pages/main";


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/main" component={Main} />
            {/*<Route path="/dishes-form" component={DishForm} /> */}
        </Switch>
    </BrowserRouter>
);

export default Routes;