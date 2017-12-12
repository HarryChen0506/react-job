//聊天用户 
import httpService from 'http_service/service.js';

const MSG_LIST = 'MSG_LIST';

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
export function getMsgList(type){
    return (dispatch)=>{
        httpService.user.list({type}).then((res)=>{
            dispatch(msgList(res.data))
        },(err)=>{
           console.log(err)
        })
    }
}

//reducer
export function chat(state = initState, action){
    switch(action.type){
        case MSG_LIST:
            return {...state, chatMsg: action.payload, unread: action.payload.filter(v=>(!v.readed)).length}
        default:
            return state
    }
}