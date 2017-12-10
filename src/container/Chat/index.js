//聊天页面
import React from 'react';
import io from 'socket.io-client';
import { List, InputItem } from 'antd-mobile';

const socket = io('ws://localhost:3001')
class Chat extends React.Component{
    render(){
        return(  
            <div>
                <div>聊天页面</div>
                <div>
                    
                </div>
            </div>
        )
    }
    componentDidMount(){
        console.log('组件');        
    }
}

export default Chat;