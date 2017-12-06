//Boss组件  牛人列表
import React from 'react';
import httpService from 'http_service/service.js';
import { WingBlank, Card, WhiteSpace } from 'antd-mobile';

class Boss extends React.Component{
    constructor(...args){
        super(...args)
        this.state = {
            userList: []
        }
    }
    render(){
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                {this.state.userList.map(v=>(
                    <div key={v._id}>
                        <Card >
                            <Header
                                title={v.user}
                                thumb= {require(`static/img/avatar/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />   
                            <Body>
                                {v.desc.split('\n').map((v,index)=>(
                                    <div key={index}>{v}</div>
                                ))}                                
                            </Body>                                         
                        </Card>
                        <WhiteSpace /> 
                    </div>
                ))}
            </WingBlank>
        ) 
    }
    componentDidMount(){
        httpService.user.list({type: 'genius'}).then((res)=>{         
            this.setState({
                userList: res.data
            })
        },(err)=>{
            console.log(err)
        })
    }
}
export default Boss;
