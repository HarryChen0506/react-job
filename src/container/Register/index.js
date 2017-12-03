//登录页面
import React from 'react';
import Logo from 'component/Logo';
import { List, InputItem, WhiteSpace, WingBlank, Button, Radio, Toast, NoticeBar  } from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from 'redux_module/redux/user.redux.js'

const types = [{
    name: '牛人',
    code: 'genius'
},{
    name: 'BOSS',
    code: 'boss'
}]
@connect(
    (state)=>({user: state.user}),
    {register}
)
class Register extends React.Component{
    constructor(args){
        super(...args)
        this.state = {
            user: '',
            pwd: '',
            repeatPwd:'',
            type: 'genius'
        }
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>                
                <Logo></Logo> 
                 <WingBlank>
                    <h3 className="ta-c">注册</h3>
                    {this.props.user.msg?<NoticeBar mode="" icon={null}>{this.props.user.msg}</NoticeBar>:null}                     
                    <WhiteSpace />   
                    <List>                                        
                        <InputItem                        
                            type="text"
                            placeholder="用户名"
                            onChange={(v)=>this.handleChange.bind(this)('user',v)}
                        >用户名</InputItem>
                        <InputItem                        
                            type="password"
                            placeholder="****"
                            onChange={(v)=>this.handleChange.bind(this)('pwd',v)}
                        >密码</InputItem> 
                        <InputItem                        
                            type="password"
                            placeholder="****"
                            onChange={(v)=>this.handleChange.bind(this)('repeatPwd',v)}
                        >重复密码</InputItem>                        
                        {types.map(v=>(                            
                            <RadioItem  
                                key={v.code} checked={this.state.type===v.code}  
                                onChange={()=>this.handleChange.bind(this)('type',v.code)}>{v.name}
                            </RadioItem>
                        ))}                  
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register.bind(this)}>注册</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.login.bind(this)}>登录</Button>
                 </WingBlank>
            </div>           
        )
    }
    handleChange(key, v){
        this.setState({
            [key]: v.trim()
        })
    }
    register(){        
        // Toast.loading('加载中...',0,true)
        if(this.state.user===''){
            Toast.info('用户名不能为空!',1);
            return 
        }else if(this.state.pwd===''){
            Toast.info('密码不能为空!',1);
            return 
        }else if(this.state.repeatPwd!==this.state.pwd){
            Toast.info('重复密码不正确!',1);
            return 
        }
        console.log('注册',this.state)
        let {user, pwd, type} = this.state;
        this.props.register({user, pwd, type});
    }
    login(){
           this.props.history.push('/login')        
    }
}
export default Register;