//聊天列表 组件

import React from 'react';
import { List, Badge } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList } from 'redux_module/redux/chat.redux.js';


@connect(
    state=>state,
    { getMsgList }
)
class Msg extends React.Component{
    componentDidMount(){
        if (!this.props.chat.chatMsg.length) {
			// this.props.getMsgList();
		} 
    }
    getMsgGroup(msgList){
         const msgGroup = {};
         msgList.forEach((v)=>{
             msgGroup[v.chatId] = msgGroup[v.chatId]||[];
             msgGroup[v.chatId].push(v);
         })
         return msgGroup;
    }
    getLastMsg(msgList){
        return msgList[msgList.length-1];
    }
    render(){
        const msgGroup = this.getMsgGroup(this.props.chat.chatMsg);
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLastMsg(a);
            const b_last = this.getLastMsg(b);
            return b_last.created_time - a_last.created_time
        });
        const users = this.props.chat.users;
        const myId = this.props.user._id;
        // console.log('chatList',chatList)
        const Item = List.Item;
        const Brief = Item.Brief;
        return (
            chatList.map((v,index)=>{
                const lastMsg = this.getLastMsg(v);                
                const targetId = lastMsg.from===myId?lastMsg.to:lastMsg.from;  //对方的id
                const unreadNum = v.filter(v=>(!v.readed&&v.to===myId)).length; //未读的并且发给我的
                if(!users[targetId] ||!users[targetId].avatar){
                    return null
                }
                const avatar = require(`static/img/avatar/${users[targetId].avatar}.png`)
                return (
                    <List key={lastMsg._id} style={{marginBottom: 5}}>
                        <Item
                            thumb={avatar}
                            extra={<Badge text={unreadNum}/>}
                            arrow="horizontal"
                            onClick={() => {
                                this.props.history.push(`/chat/${targetId}`)
                            }}
                        >
                            {lastMsg.content}
                            <Brief>{users[targetId].name}</Brief>
                        </Item>
                    </List>
                )
            })           
        )
    }
}
export default Msg;
