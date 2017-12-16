//聊天页面
import React from 'react';
// import io from 'socket.io-client';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from 'redux_module/redux/chat.redux.js';
import './chat.scss';
const Item = List.Item;
// const socket = io('ws://localhost:3001');   //不行
// const socket = io('ws://192.168.1.105:3001');  //可以，192.168.1.105是我的局域网ip , 3001是server的端口
// const io_url = window.location.hostname+':3001';
// const socket = io(io_url);                       //可以，推荐这种方式吧。


// const socket = io('ws://127.0.0.1:8081',{path: '/chat/socket.io/'});
// const socket = io('ws://127.0.0.1:3001');
@connect(
    state=>state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            text: ''
        }
    }
    componentDidMount(){
        if (!this.props.chat.chatMsg.length) {
			this.props.getMsgList();
            this.props.recvMsg();
		}        
    }  
    componentWillUnmount(){
        // console.log('销毁')
    }
    handleSendMsg(){
        const from = this.props.user._id;
        const to = this.props.match.params.userId;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg})
        this.setState({
            text: ''
        })        
    }    
    showMsg(somebodyId, myId, v, users){
        const avatar = require(`static/img/avatar/${users[v.from].avatar}.png`) 
        if(v.from===somebodyId && v.to===myId){
            return (<List key={v._id} className="chat-somebody">
                        <Item
                            wrap
                            thumb={avatar}
                        >
                        {v.content}
                        </Item>    
                    </List>)
        }else if(v.from===myId && v.to===somebodyId){
            return (<List key={v._id} className="chat-me">
                        <Item
                            wrap
                            extra={<img src={avatar}/>}
                        >
                        {v.content}
                        </Item>    
                    </List>)
        }else{
            return null
        }         
    }
    render(){
        const msg = this.props.chat.chatMsg;
        // console.log('userId',this.props.match.params.userId)
        // console.log('me',this.props.user)
        const userId = this.props.match.params.userId;
        const users = this.props.chat.users;
        
        const myId = this.props.user._id;  
        if(!users||!users[userId]){
            return null
        }
        return (  
            <div className="chat-page">
                <NavBar mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >{users[userId].name}</NavBar> 
                <div className="main">
                    {msg.map((v,index)=>(
                       this.showMsg(userId,myId,v, users)
                    ))}
                </div>                
                <List>
                    <InputItem
                        type="text"
                        placeholder="请输入..."
                        onChange={(v)=>{
                            this.setState({
                                text: v
                            })
                        }}
                        onKeyUp={(v)=>{
                            if(v.keyCode===13){
                                this.handleSendMsg.bind(this)()
                            }
                        }}
                        value={this.state.text}
                        extra={<span onClick={this.handleSendMsg.bind(this)}>发送</span>}
                    ></InputItem>
                </List>
            </div>
        )
    }     
}

export default Chat;