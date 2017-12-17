//聊天用户 
import httpService from 'http_service/service.js';
import io from 'socket.io-client';

const io_url = window.location.hostname+':3001';
const socket = io(io_url);                       //可以，推荐这种方式吧。



const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';

const initState = {
    chatMsg: [],
    users:[],
    unread: 0
}

function msgList(msgs, users, userId){
    return {
        type: MSG_LIST,
        payload: {msgs, users, userId}
    }
}
function msgRecv(data, userId){
    return {
        type: MSG_RECV,
        payload: data,
        userId: userId
    }
}
export function getMsgList(type){
    return (dispatch,getState)=>{
        httpService.user.chatlist({type}).then((res)=>{
            // console.log('getState',getState())
            const myId = getState().user._id;
            dispatch(msgList(res.data.result, res.data.users, myId))
        },(err)=>{
           console.log(err)
        })
    }
}
export function recvMsg(){
    return (dispatch, getState)=>{
        socket.on('recvMsg',(data)=>{
            const myId = getState().user._id;
            dispatch(msgRecv(data._doc, myId))            
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
            return {...state, chatMsg: action.payload.msgs, users:action.payload.users, unread: action.payload.msgs.filter(v=>(!v.readed&&v.to===action.payload.userId)).length}
        case MSG_RECV:
            const n = action.userId===action.payload.to?1:0;
            return {...state, chatMsg: [...state.chatMsg, action.payload], unread:state.unread+n }
        default:
            return state
    }
}