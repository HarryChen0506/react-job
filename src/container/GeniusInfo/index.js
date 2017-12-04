//完善genius信息页
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import AvatarSelector from 'component/AvatarSelector';
import { update } from 'redux_module/redux/user.redux.js';

@connect(
    (state)=>({user: state.user}),
    {update}
)
class GeniusInfo extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            title: '',
            desc: '',           
            avatar: ''
        }
    }
    render(){
        const path = this.props.location.pathname;
        const redirectTo = this.props.user.redirectTo;
        return (
            <div>
                {redirectTo&&redirectTo!==path?<Redirect to={redirectTo}></Redirect>:null}
                <NavBar mode="dark">牛人信息完善页</NavBar>
                <AvatarSelector
                    onSelectAvatar = {(v)=>{this.handleChange.bind(this)('avatar',v)}}
                ></AvatarSelector>
                <InputItem                        
                    type="text"
                    placeholder="职位名称"
                    clear
                    onChange={(v)=>this.handleChange.bind(this)('title',v)}
                >求职职位</InputItem>                
                <TextareaItem           
                    title="个人简介"
                    placeholder="个人技能、工作经历等"
                    clear
                    rows={3}
                    autoHeight
                    labelNumber={5}
                    onChange={(v)=>this.handleChange.bind(this)('desc',v)}
                />
                <Button type="primary" onClick={this.update.bind(this)}>保存</Button>
            </div>            
        )
    }
    handleChange(key, val){
        this.setState({
            [key]: val
        })
    }
    update(){
        console.log(this.state)
        this.props.update(this.state);
    }
}

export default GeniusInfo;