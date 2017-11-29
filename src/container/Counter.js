//Counter 计数器页面

import React from 'react';
import { connect } from 'react-redux';
//action
import { addCounter, reduceCounter, resetCounter} from 'redux_module/redux/counter.redux.js';

@connect(
    (state)=>({counter: state.counter}),
    {addCounter, reduceCounter, resetCounter}
)
class Counter extends React.Component {
    constructor(props, context){
        super(props, context);
    }
    render(){
        return (
            <div>
                <h3>计数器</h3>
                <div>数量：{this.props.counter.num}</div>
                <div>
                    <button onClick={this.handleAdd.bind(this)}>增加</button>
                    <button onClick={this.handleReduce.bind(this)}>减少</button>
                    <button onClick={this.handleReset.bind(this)}>恢复</button>
                </div>
            </div>
        )
    }
    handleAdd(){
        this.props.addCounter()
    }
    handleReduce(){
        this.props.reduceCounter()
    }
    handleReset(){
        this.props.resetCounter()
    }

}
export default Counter;