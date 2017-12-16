// 路由
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
// import Demo from 'container/Demo.js'
import Login from 'container/Login'
import Register from 'container/Register'
import AuthRoute from 'component/AuthRoute'
import BossInfo from 'container/BossInfo'
import GeniusInfo from 'container/GeniusInfo'
import Dashboard from 'container/Dashboard'
import Chat from 'container/Chat'

// function AuthRoute(){
//     return (<div>123</div>)
// }

class AppRoute extends React.Component{ 
    render(){
        return(
            <BrowserRouter>
                <div className="router">       
                    <AuthRoute/>
                    <Switch>   
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/bossinfo" component={BossInfo} />
                        <Route path="/geniusinfo" component={GeniusInfo} />
                        <Route path="/chat/:userId" component={Chat}/>          
                        <Route component={Dashboard} />
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