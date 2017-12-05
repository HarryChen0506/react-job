//头像选择组件
import React from 'react';
import PropTypes from 'prop-types';
import {List, Grid} from 'antd-mobile';
import './avatar-selector.scss';
class AvatarSelector extends React.Component{  
    static propTypes = {
        onSelectAvatar: PropTypes.func    
    }
    constructor(...args){
        super(...args);
        this.state = {
            icon: '',
            imgname: ''
        }
    }
    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                        .split(',')
                        .map((val, i) => ({
                            icon: require(`static/img/avatar/${val}.png`),
                            text: `${val}`
                        }));
        let avatarHeader = this.state.imgname?
            (<div style={{height:30}}><span>当前选择的头像</span><img src={this.state.icon} style={{width: 20,marginLeft:10}} alt=""/></div>):
            (<div style={{height:30}}><span>请选择头像</span></div>);
        return (
            <div>
                <List renderHeader={() => avatarHeader} className="my-list">
                    <Grid 
                        data={avatarList} 
                        columnNum={5}  
                        onClick={(ele)=>{ this.handleClick.bind(this)(ele)}}
                    />
                </List>                
            </div>
        )       
    }
    handleClick(ele){
        // console.log(ele)
        this.setState({
            icon: ele.icon,
            imgname: ele.text
        })
        this.props.onSelectAvatar(ele.text);
    }
}
export default AvatarSelector;