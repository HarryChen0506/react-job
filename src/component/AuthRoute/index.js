//根据权限来控制跳转页面
import React from 'react';
import { withRouter } from 'react-router-dom';
import httpService from 'http_service/service.js';

@withRouter
class AuthRoute extends React.Component{
    constructor(args){
        super(...args)
    }
    render(){
        return null
    }
    componentDidMount(){
        //发送接口判断用户是否登录
        const publicRoute = ['/login','/register'];
        const path = this.props.location.pathname;
        if(publicRoute.some((v)=>{
            return v===path
        })){
            //如果直接访问公开路径，直接跳出
            return false
        }
        // console.log(this)
        httpService.user.info({}).then((res)=>{
            let data = res.data
            if(data.code===200){
                this.props.history.push('/dashboard')
            }else{
                this.props.history.push('/login')
            }
        },(err)=>{
            console.log(err)
        })
    }
}
export default AuthRoute;