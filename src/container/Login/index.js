//登录页面
import React from 'react';
import Logo from 'component/Logo';
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';

class Login extends React.Component{
    constructor(args){
        super(...args)
        this.state = {
            user: '',
            pwd: ''
        }
    }
    render(){
        return (
            <div>
                <Logo></Logo> 
                 <WingBlank>
                     <h3 className="ta-c">登录</h3>
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
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register.bind(this)}>注册</Button>
                 </WingBlank>
            </div>           
        )
    }
    register(){
        this.props.history.push('/register')
    }
}
export default Login;