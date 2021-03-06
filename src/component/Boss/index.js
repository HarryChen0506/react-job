//Boss组件  牛人列表
import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from 'redux_module/redux/chatuser.redux.js';
import UserCard from 'component/UserCard';

@connect(
    state=>({chatuser: state.chatuser}),
    { getUserList }
)
class Boss extends React.Component{
    render(){
        const userList = this.props.chatuser.userList;
        return (
            <UserCard dataList={userList}></UserCard>
        ) 
    }
    componentDidMount(){
        this.props.getUserList('genius')
    }
}
export default Boss;
