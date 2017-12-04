//完善boss信息页
import React from 'react';
import { connect } from 'react-redux';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import AvatarSelector from 'component/AvatarSelector';
import { update } from 'redux_module/redux/user.redux.js';
@connect(
    (state)=>({user: state.user}),
    {update}
)
class BossInfo extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            title: '',
            desc: '',
            company: '',
            salary: '',
            avatar: ''
        }
    }
    render(){
        return (
            <div>
                <NavBar mode="dark">boss信息完善页</NavBar>
                <AvatarSelector
                    onSelectAvatar = {(v)=>{this.handleChange.bind(this)('avatar',v)}}
                ></AvatarSelector>
                <InputItem                        
                    type="text"
                    placeholder="职位名称"
                    clear
                    onChange={(v)=>this.handleChange.bind(this)('title',v)}
                >招聘职位</InputItem>
                <InputItem                        
                    type="text"
                    placeholder="公司名称"
                    clear
                    onChange={(v)=>this.handleChange.bind(this)('company',v)}
                >招聘公司</InputItem>
                <InputItem                        
                    type="text"
                    placeholder="薪水范围"
                    clear
                    onChange={(v)=>this.handleChange.bind(this)('salary',v)}
                >薪水待遇</InputItem>
                <TextareaItem           
                    title="职位描述"
                    placeholder="职位要求等"
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

export default BossInfo;