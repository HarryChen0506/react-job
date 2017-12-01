import httpService from 'http_service/service.js';

//定义变量
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

function registerSuccess(data){
    return {
        type: REGISTER_SUCCESS,
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
        default:
            return state
    }
}