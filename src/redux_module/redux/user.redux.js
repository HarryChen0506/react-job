import httpService from 'http_service/service.js';

//定义变量
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const ERROR_MSG_CLEAR = 'ERROR_MSG_CLEAR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

function registerSuccess(data){
    return {
        type: REGISTER_SUCCESS,
        payload: data
    } 
}
function loginSuccess(data){
    return {
        type: LOGIN_SUCCESS,
        payload: data
    } 
}
export function register(postData){
    return (dispatch)=>{
        httpService.user.register(postData).then((res)=>{
            if(res.data.code===200){
                dispatch(registerSuccess(res.data.result))
            }else{
                dispatch(errorMsg({msg:res.data.msg}))
            }
        },(err)=>{
            dispatch(errorMsg({msg:err}))
        })
    }
}
export function errorMsg(data){
    return {
        type: ERROR_MSG,
        payload: data
    }
}
export function errMsgClear(data){
    return {
        type: ERROR_MSG_CLEAR,
        payload: data
    }
}
export function login(postData){
    return (dispatch)=>{
        httpService.user.login(postData).then((res)=>{
            if(res.data.code===200){
                dispatch(loginSuccess(res.data.result))
            }else{
                dispatch(errorMsg({msg:res.data.msg}))
            }
        },(err)=>{
            dispatch(errorMsg({msg:err}))
        })
    }
}
const initState = {
    user: '',
    pwd: '',
    type: '',
    isAuth: false,
    msg: ''
}
export function user(state = initState, action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return {...state, ...action.payload, msg:'', isAuth: true}
        case ERROR_MSG:
            return {...state, ...action.payload} 
        case ERROR_MSG_CLEAR:
            return {...state, ...action.payload, msg:''}
        case LOGIN_SUCCESS:
            return {...state, ...action.payload, msg:'', isAuth: true}
        default:
            return state
    }
}