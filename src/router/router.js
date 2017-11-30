// 路由
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from 'container/Dashboard.js'
import Login from 'container/Login'
import Register from 'container/Register'


function getRouter(){
    return (
        <BrowserRouter>
            <Switch>            
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Redirect to="/dashboard"></Redirect>
            </Switch>            
        </BrowserRouter>
    )
}

export default getRouter;