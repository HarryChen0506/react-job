//计数器的redux 

const COUNTER_ADD = "COUNTER_ADD";
const COUNTER_REDUCE = "COUNTER_REDUCE";
const COUNTER_RESET = "COUNTER_RESET";
const COUNTER_ADD_ASYNC = "COUNTER_ADD_ASYNC";
const initState = {
    num: 0
}

//action
export function addCounter(){
    return {
        type: COUNTER_ADD
    }
}
export function reduceCounter(){
    return {
        type: COUNTER_REDUCE
    }
}
export function resetCounter(){
    return {
        type: COUNTER_RESET
    }
}
export function addAsyncCounter(){

    // return {
    //     type: COUNTER_ADD_ASYNC,
    //     playload: 100
    // }
    return (dispatch, getState)=>{
        let state = getState();
        setTimeout(()=>{
            dispatch({
                type: COUNTER_ADD_ASYNC,
                payload: state.counter.num + 10
            })
        },2000)
    }
}

//reducer 
export function counter(state = initState, action){
    switch(action.type){
        case COUNTER_ADD:
            return {...state, num: state.num+1}
        case COUNTER_REDUCE:
            return {...state, num: state.num-1}
        case COUNTER_RESET:
            return {...initState}
        case COUNTER_ADD_ASYNC: 
            return {...state, num: action.payload}
        default:
            return state
    }
}