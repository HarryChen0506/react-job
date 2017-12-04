import httpService from 'http_service/service.js';
import { getRedirectToPath } from 'utils/tool.js';

//定义变量
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const ERROR_MSG_CLEAR = 'ERROR_MSG_CLEAR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA'; //加载用户数据
const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';  //鉴权成功（登录，注册，更新）

function authSuccess(data){
    return {
        type: AUTH_SUCCESS,
        payload: data
    } 
}
export function loadData(data){
    return {
        type: LOAD_DATA,
        payload: data
    }
}
export function register(postData){
    return (dispatch)=>{
        httpService.user.register(postData).then((res)=>{
            if(res.data.code===200){
                dispatch(authSuccess(res.data.result))
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
export function update(postData){
    return (dispatch)=>{
        httpService.user.update(postData).then((res)=>{
            if(res.data.code===200){
                dispatch(authSuccess(res.data.result))
            }else{
                dispatch(errorMsg({msg:res.data.msg}))
            }
        },(err)=>{
            dispatch(errorMsg({msg:err}))
        })
    }
}
export function login(postData, success_cb, fail_cb){
    return (dispatch)=>{
        httpService.user.login(postData).then((res)=>{
            if(res.data.code===200){
                dispatch(authSuccess(res.data.result))
                success_cb && success_cb();
            }else{
                dispatch(errorMsg({msg:res.data.msg}))
                fail_cb && fail_cb();
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
    msg: '',
    redirectTo: ''
}
export function user(state = initState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, ...action.payload, msg:'',  redirectTo: getRedirectToPath(action.payload)}
        case ERROR_MSG:
            return {...state, ...action.payload} 
        case ERROR_MSG_CLEAR:
            return {...state, ...action.payload, msg:''}       
        case LOAD_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}