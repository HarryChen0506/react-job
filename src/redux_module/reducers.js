// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { counter } from './redux/counter.redux.js'
import { user } from './redux/user.redux.js'
import { chatuser } from './redux/chatuser.redux.js'

export default combineReducers({
    counter,
    user,
    chatuser
})