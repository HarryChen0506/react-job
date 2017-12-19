// 个人中心页 fix
import React from 'react';
import { connect } from 'react-redux';
import { Result, List, Button, WhiteSpace, WingBlank, Modal } from 'antd-mobile';
import { Redirect, withRouter } from 'react-router-dom';
// import BrowserCookie from 'browser-cookies';
import httpService from 'http_service/service.js';
import { logout } from 'redux_module/redux/user.redux.js';

const alert = Modal.alert;
@withRouter
@connect(
    state=>({user: state.user}),
    { logout }
)
class User extends React.Component{
    render(){
        const user = this.props.user;
        const Item = List.Item;
        const Brief = Item.Brief;
        const redirectTo = this.props.user.redirectTo; 
        return(
            user.user?(
            <div>                
                <Result
                    img={<img src={require(`static/img/avatar/${user.avatar}.png`)} style={{width:50}} className="" alt="" />}
                    title={user.user}
                    message={user.type==='boss'?user.company:null}
                />
                <List renderHeader={() => '简介'} className="my-list">
                    <Item wrap={true}>
                        {user.title}
                        {user.desc.split('\n').map((v,index)=>(
                            <div key={index} style={{paddingLeft: 48}}><Brief >{v}</Brief></div>
                        ))}
                        {user.company? <Brief>公司：{user.company}</Brief>:null}
                        {user.salary? <Brief>薪资：{user.salary}</Brief>:null}                       
                    </Item>
                </List> 
                <WhiteSpace size="lg"/>
                <WingBlank>
                    <Button type='primary' onClick={this.logout.bind(this)}>注销</Button>    
                </WingBlank>                          
            </div>):(redirectTo===''?null:<Redirect to={redirectTo} />)
        )
    }
    logout(){
        alert('注销', '您确定退出登录吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                // BrowserCookie.erase('userId');
               this.clearCookie.bind(this)();
            } },
        ])
    }
    clearCookie(){
        httpService.user.logout().then((res)=>{
            if(res.data.code===200){
                this.props.logout();
                this.props.history.push('/login')
            }            
        },(err)=>{
            console.log(err)
        })
    }
}

export default User;