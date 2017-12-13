//聊天用户 
import httpService from 'http_service/service.js';
import io from 'socket.io-client';

const io_url = window.location.hostname+':3001';
const socket = io(io_url);                       //可以，推荐这种方式吧。



const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';

const initState = {
    chatMsg: [],
    unread: 0
}

function msgList(data){
    return {
        type: MSG_LIST,
        payload: data
    }
}
function msgRecv(data){
    return {
        type: MSG_RECV,
        payload: data
    }
}
export function getMsgList(type){
    return (dispatch)=>{
        httpService.user.chatlist({type}).then((res)=>{
            dispatch(msgList(res.data.result))
        },(err)=>{
           console.log(err)
        })
    }
}
export function recvMsg(){
    return dispatch=>{
        socket.on('recvMsg',(data)=>{
            console.log(data);
            dispatch(msgRecv(data._doc))            
        })
    }
}
export function sendMsg({from, to, msg}){
    return dispatch=>{
        // console.log({from, to, msg})
        socket.emit('sendMsg',{from, to, msg});
    }
}

//reducer
export function chat(state = initState, action){
    switch(action.type){
        case MSG_LIST:
            return {...state, chatMsg: action.payload, unread: action.payload.filter(v=>(!v.readed)).length}
        case MSG_RECV:
            return {...state, chatMsg: [...state.chatMsg, action.payload], unread:state.chatMsg.length+1 }
        default:
            return state
    }
}