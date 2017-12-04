// 路由
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from 'container/Dashboard.js'
import Login from 'container/Login'
import Register from 'container/Register'
import AuthRoute from 'component/AuthRoute'
import BossInfo from 'container/BossInfo'
// function AuthRoute(){
//     return (<div>123</div>)
// }

class AppRoute extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <div>       
                    <AuthRoute/>
                    <Switch>   
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/bossinfo" component={BossInfo} />
                        <Route path="/dashboard" component={Dashboard} />
                    </Switch> 
                </div>  
            </BrowserRouter>
        )
    }
}
/*function getRouter(){
    return (
        <BrowserRouter>
            <Switch>     
                <AuthRoute/>      
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Redirect to="/dashboard"></Redirect>
            </Switch>            
        </BrowserRouter>
    )
}*/

export default AppRoute;