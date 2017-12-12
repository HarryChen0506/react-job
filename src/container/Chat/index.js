//聊天页面
import React from 'react';
import io from 'socket.io-client';
import { List, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList } from 'redux_module/redux/chat.redux.js';

// const socket = io('ws://localhost:3001');   //不行
// const socket = io('ws://192.168.1.105:3001');  //可以，192.168.1.105是我的局域网ip , 3001是server的端口
const io_url = window.location.hostname+':3001';
const socket = io(io_url);                       //可以，推荐这种方式吧。


// const socket = io('ws://127.0.0.1:8081',{path: '/chat/socket.io/'});
// const socket = io('ws://127.0.0.1:3001');
@connect(
    state=>state,
    { getMsgList }
)
class Chat extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            text: '',
            msg: []
        }
    }
    componentDidMount(){ 
        socket.on('recvMsg',(data)=>{
            console.log(data)
            this.setState({
                msg: [...this.state.msg, data.text]
            })
        })
    }  
    handleSendMsg(){
        socket.emit('sendMsg',{text: this.state.text});
        this.setState({
            text: ''
        })
    }
    render(){
        const msg = this.state.msg;
        console.log('userId',this.props.match.params.userId)
        return (  
            <div>
                <div>聊天页面11111</div>  
                {msg.map((v,index)=>(
                    <div key={index}>{v}</div>
                ))}
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