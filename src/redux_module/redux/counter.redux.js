//计数器的redux 

const COUNTER_ADD = "COUNTER_ADD";
const COUNTER_REDUCE = "COUNTER_REDUCE";
const COUNTER_RESET = "COUNTER_RESET";
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

//reducer 
export function counter(state = initState, action){
    switch(action.type){
        case COUNTER_ADD:
            return {...state, num: state.num+1}
        case COUNTER_REDUCE:
            return {...state, num: state.num-1}
        case COUNTER_RESET:
            return {...initState}
        default:
            return state
    }
}