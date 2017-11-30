//登录页面
import React from 'react';
import Logo from 'component/Logo';
import { List, InputItem, WhiteSpace, WingBlank, Button, Radio  } from 'antd-mobile';

const types = [{
    name: '牛人',
    code: 'genius'
},{
    name: 'BOSS',
    code: 'boss'
}]

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
                     <List>                    
                        <InputItem                        
                            type="text"
                            placeholder="用户名"
                            onChange={(v)=>{
                                this.setState({
                                    user: v
                                })
                            }}
                        >用户名</InputItem>
                        <InputItem                        
                            type="password"
                            placeholder="****"
                            onChange={(v)=>{
                                this.setState({
                                    pwd: v
                                })
                            }}
                        >密码</InputItem> 
                        <InputItem                        
                            type="password"
                            placeholder="****"
                            onChange={(v)=>{
                                this.setState({
                                    repeatPwd: v
                                })
                            }}
                        >重复密码</InputItem>                        
                        {types.map(v=>(                            
                            <RadioItem  key={v.code} checked={this.state.type===v.code}  onChange={()=>{
                                this.setState({
                                    type: v.code
                                })
                            }}>{v.name}
                            </RadioItem>
                        ))}                  
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.login.bind(this)}>登录</Button>
                 </WingBlank>
            </div>           
        )
    }
    login(){
           this.props.history.push('/login')
        
    }
}
export default Register;