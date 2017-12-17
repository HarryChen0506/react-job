//聊天页面
import React from 'react';
// import io from 'socket.io-client';
import { List, NavBar, Icon, Toast,TextareaItem } from 'antd-mobile';
import Emoji from 'component/Emoji';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg, readMsg } from 'redux_module/redux/chat.redux.js';
import { getChatId } from 'utils/tool.js';
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
    { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            text: '',
            showEmoji: false
        }
        this.chatMsgLength = 0; //记录当前的聊天条数
    }
    componentDidMount(){
        if (!this.props.chat.chatMsg.length) {
			this.props.getMsgList();
		}
        this.scrollChatBox();
    }  
    componentDidUpdate(){
       const chatMsgLength = this.getChatMsgLength();
        if(chatMsgLength!==this.chatMsgLength){   
            //如果当前聊天的信息增加，就触发scroll        
            this.chatMsgLength = chatMsgLength;
            this.scrollChatBox();
        }
    }
    componentWillUnmount(){
        // console.log('销毁')
        const myId = this.props.user._id; 
        const targrtId = this.props.match.params.userId; 
        // console.log('state', this.props.chat.chatMsg)  
        const hasUnreaded = this.props.chat.chatMsg.some((v, index)=>{
            return v.from===targrtId && v.to===myId && v.readed===false
        })  
        // console.log('hasUnreaded',hasUnreaded)
        if(hasUnreaded){
            //如果有未读的，就发送接口给后台，将未读消息归0
             this.props.readMsg({
                from: targrtId,
                to: myId
            });
        }       
    }
    getChatMsgLength(){
        const userId = this.props.match.params.userId;
        const myId = this.props.user._id; 
        const msg = this.props.chat.chatMsg.filter(v=>v.chatId===getChatId(myId,userId));
        return msg.length
    }
    scrollChatBox(){
        var dom = document.getElementById('chat-main');        
        if(dom){
            // console.log('dom',dom.scrollHeight);
            dom.scrollTop = dom.scrollHeight;
        }
    }
    handleSendMsg(){
        const from = this.props.user._id;
        const to = this.props.match.params.userId;
        const msg = this.state.text;
        if(msg===''){
             Toast.info('发送内容不能为空!',1);
            return 
        }
        this.props.sendMsg({from, to, msg})
        this.setState({
            text: '',
            showEmoji: false
        })        
    }  
    handleShowEmoji(){
        this.setState({
            showEmoji: !this.state.showEmoji
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
                        {v.content.split('\n').map((v,index)=>(
                            <div key={index}>{v}</div>     
                        ))}
                        </Item>    
                    </List>)
        }else if(v.from===myId && v.to===somebodyId){
            return (<List key={v._id} className="chat-me">
                        <Item
                            wrap
                            extra={<img src={avatar} alt=""/>}
                        >
                        {v.content.split('\n').map((v,index)=>(
                            <div key={index}>{v}</div>     
                        ))}
                        </Item>    
                    </List>)
        }else{
            return null
        }         
    }
    render(){        
        // console.log('userId',this.props.match.params.userId)
        // console.log('me',this.props.user)
        const userId = this.props.match.params.userId;
        const users = this.props.chat.users;
        const myId = this.props.user._id; 

        const msg = this.props.chat.chatMsg.filter(v=>v.chatId===getChatId(myId,userId));      
         
        if(!users||!users[userId]){
            return null
        }
        return (  
            <div className="chat-page">
                <NavBar mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >{users[userId].name}</NavBar> 
                <div className="main" id="chat-main">
                    {msg.map((v,index)=>(
                       this.showMsg(userId,myId,v, users)
                    ))}
                </div>                
                <List>
                    <div className="send-box">
                        <div className="textarea-input">
                            <TextareaItem 
                                placeholder="请输入..."
                                data-seed="logId"
                                ref={el => this.autoFocusInst = el}
                                value={this.state.text}
                                onChange={(v)=>{
                                    this.setState({
                                        text: v
                                    })
                                }}
                                autoHeight
                            />
                        </div>
                        <div className="send-msg">
                            <span className="emoji" onClick={this.handleShowEmoji.bind(this)}>😃</span>
                            <span onClick={this.handleSendMsg.bind(this)}>发送</span>
                        </div>
                    </div>                    
                    {/*<InputItem
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
                        extra={
                            <div style={{lineHeight: '20px'}}>
                                <span 
                                    style={{marginRight:5}} 
                                    onClick={this.handleShowEmoji.bind(this)}
                                >😃</span>
                                <span onClick={this.handleSendMsg.bind(this)}>发送</span>
                            </div>                             
                        }
                    ></InputItem>*/}
                    {this.state.showEmoji?<Emoji onHandleClick={v=>{
                        this.setState({
                            text: this.state.text + v.text
                        })
                    }}/>:null}                  
                </List>
            </div>
        )
    }     
}

export default Chat;