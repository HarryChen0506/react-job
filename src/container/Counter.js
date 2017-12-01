//Counter 计数器页面

import React from 'react';
import { connect } from 'react-redux';
//action
import { addCounter, reduceCounter, resetCounter, addAsyncCounter} from 'redux_module/redux/counter.redux.js';
import axios from 'axios';
import httpService from 'http_service/service.js';

const mapStateToProps = function(state){
    return {counter: state.counter}
}
@connect(
    mapStateToProps,
    {addCounter, reduceCounter, resetCounter, addAsyncCounter}
)
class Counter extends React.Component {
       render(){
        return (
            <div>
                <h3>计数器</h3>
                <div>数量：{this.props.counter.num}</div>
                <div>
                    <button onClick={this.handleAdd.bind(this)}>增加</button>
                    <button onClick={this.handleReduce.bind(this)}>减少</button>
                    <button onClick={this.handleReset.bind(this)}>恢复</button>
                    <button onClick={()=>this.props.addAsyncCounter()}>异步增加</button>
                </div>
                <div>
                    <button onClick={this.handleGetData.bind(this)}>请求接口</button>
                    <button onClick={this.handleGetData2.bind(this)}>请求接口2</button>
                    <button onClick={this.handlePostData.bind(this)}>post接口</button>
                    <button onClick={this.handlePostFormData.bind(this)}>post接口Form</button>
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
    handleGetData(){
        console.log('接口');
        axios.get('/api/demo/list').then(res=>{
            console.log(res)
        })
    }
    handleGetData2(){
        console.log('接口2');
        httpService.demo.get('/api/demo/list',{
            name: 'harry'
        }).then((res)=>{
            console.log('res',res)
        },(err)=>{
            console.log('err',err)
        })
    }
    handlePostData(){
        console.log('post接口');
        httpService.demo.post('/api/demo/postform',{
            name: 'harry'
        }).then((res)=>{
            console.log('res',res)
        },(err)=>{
            console.log('err',err)
        })
    }
    handlePostFormData(){
        console.log('post接口');
        httpService.demo.postForm('/api/demo/postform',{
            name: 'harry'
        }).then((res)=>{
            console.log('res',res)
        },(err)=>{
            console.log('err',err)
        })
    }

}
export default Counter;