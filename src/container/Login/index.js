//登录页面
import React from 'react';
import Logo from 'component/Logo';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WhiteSpace, WingBlank, Button, NoticeBar, Toast} from 'antd-mobile';
import { login, errMsgClear } from 'redux_module/redux/user.redux.js';
@connect(
    state=>({user: state.user}),
    {login, errMsgClear}
)
class Login extends React.Component{
    constructor(args){
        super(...args)
        this.state = {
            user: '',
            pwd: '',
        }        
        this.timeId = null;
    }
    render(){  
        const redirectTo = this.props.user.redirectTo;
        const pathname = this.props.location.pathname;
        return (
            <div>
                <Logo></Logo> 
                 <WingBlank>
                    <h3 className="ta-c">登录</h3>
                    {redirectTo&&redirectTo!==pathname?<Redirect to={redirectTo}></Redirect>:null}
                    {this.props.user.msg?<NoticeBar mode="" icon={null}>{this.props.user.msg}</NoticeBar>:null}                     
                    <WhiteSpace /> 
                    <List>                    
                        <InputItem                        
                            type="text"
                            placeholder="用户名"
                            clear
                            value={this.state.user}
                            onChange={(v)=>{this.handleChange.bind(this)('user',v)}}
                        >用户名</InputItem>
                        <InputItem   
                            ref={(v)=>{this.pwdInput = v}}                     
                            type="password"
                            placeholder="****"
                            clear
                            onChange={(v)=>{this.handleChange.bind(this)('pwd',v)}}
                        >密码</InputItem>                    
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.login.bind(this)}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register.bind(this)}>注册</Button>
                 </WingBlank>
            </div>           
        )
    }
    handleChange(key, v){
        this.setState({
            [key]: v
        })
    }
    login(){
        // console.log('登录',this.state)
        let {user, pwd} = this.state;
        if(user===''){
            Toast.info('用户名不能为空!',1);
            return 
        }else if(pwd===''){
            Toast.info('密码不能为空!',1);
            return 
        }
        this.props.login({user, pwd},()=>{
            //成功的回调
            console.log('成功的回调')
        },()=>{
            //失败的回调
            console.log('失败的回调')
            this.pwdInput.clearInput();
        })
    }
    register(){ 
        this.props.errMsgClear();
        this.props.history.push('/register')
    }
}
export default Login;