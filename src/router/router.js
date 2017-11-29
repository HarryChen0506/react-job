// 路由
import React from 'react';
import { Link, BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from 'container/Dashboard.js'


function Login(){
    return(
        <div>登录页面</div>     
    )
}
function getRouter(){
    return (
        <BrowserRouter>
            <Switch>            
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Redirect to="/dashboard"></Redirect>
            </Switch>            
        </BrowserRouter>
    )
}

export default getRouter;