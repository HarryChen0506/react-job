//面板页面
import React from 'react';
import {NavBar,} from 'antd-mobile';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NavLinkBar from 'component/NavLinkBar'
import './dashboard.scss'
import Boss from 'component/Boss'
import Genius from 'component/Genius'
import User from 'component/User'
import { Button } from 'antd-mobile'


// function Msg(){
//     return <div>Msg</div>
// }
class Msg extends React.Component{

    render(){
        return(
            <Button type="primary" onClick={()=>{
                this.props.history.push('/chat/mike')
            }}>开始聊天</Button>
        )
    }
}
  
@connect(
    state=>({user: state.user}),
    null
)
class Dashboard extends React.Component{      
    render(){
        const pathname = this.props.location.pathname;
        const type = this.props.user.type;
        const navList = [{
            path: '/boss',
            text: '牛人',
            icon: 'boss',
            title: '牛人列表',
            component: Boss,
            hide: type==='genius'
        },{
            path: '/genius',
            text: 'Boss',
            icon: 'job',
            title: 'Boss列表',
            component: Genius,
            hide: type==='boss'
        },{
            path: '/msg',
            text: '消息',
            icon: 'msg',
            title: '消息中心',
            component: Msg 
        },{
            path: '/me',
            text: '我',
            icon: 'user',
            title: '个人中心',
            component: User
        }];        
        const title = navList.filter((v)=>v.path===pathname)[0] && navList.filter((v)=>v.path===pathname)[0].title;
        const filterList = navList.filter(v=>!v.hide);
        console.log('测试dash',pathname)
        return(
            <div className="dashboard">       
                <NavBar mode="dark">{title}</NavBar>                
                <div className="main">
                    <Switch>
                        {filterList.map(v=>(
                           <Route key={v.text} path={v.path} component={v.component}></Route> 
                        ))}
                    </Switch>
                </div>
                <NavLinkBar  dataList={filterList}></NavLinkBar>
            </div>
        )
    }
}
export default Dashboard;