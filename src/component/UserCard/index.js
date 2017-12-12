//用户列表 卡片
import React from 'react';
import { WingBlank, Card, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';

class UserCard extends React.Component{
    render(){
        const Header = Card.Header;
        const Body = Card.Body;
        const userList = this.props.dataList;
        return(
            <WingBlank>
                {userList.map(v=>(
                    <div key={v._id}>
                        <Card >
                            <Header
                                title={v.user}
                                thumb= {require(`static/img/avatar/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />   
                            <Body>
                                {v.type==='boss'?<div>公司：{v.company}</div>:null}
                                <WhiteSpace />
                                {v.desc.split('\n').map((val,index)=>(
                                    <div key={index}>{val}</div>
                                ))} 
                                <WhiteSpace />
                                {v.type==='boss'?<div>薪资：{v.salary}</div>:null}
                            </Body>                                         
                        </Card>
                        <WhiteSpace /> 
                    </div>
                ))}
            </WingBlank>
        )
    }
}
UserCard.prototype.propTypes = {
        dataList: PropTypes.array    
    }

export default UserCard;