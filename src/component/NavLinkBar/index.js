//底部tab栏
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { connect} from 'react-redux';

@withRouter
@connect(
    state=>({chat: state.chat}),
    null
)
class NavLinkBar extends React.Component{   
    render(){
        const Item = TabBar.Item;
        const navList = this.props.dataList;
        const pathname = this.props.location.pathname;
        return(            
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={false}
            >                
            {navList.map((v)=>(
                <Item
                    badge={v.path==='/msg'?this.props.chat.unread:0}
                    title={v.text}
                    key={v.text}
                    icon={{ uri: require(`static/img/tab/${v.icon}.png`) }}
                    selectedIcon={{ uri: require(`static/img/tab/${v.icon}-active.png`) }}                    
                    selected={pathname===v.path}
                    onPress={()=>{
                        this.props.history.push(v.path)
                    }}
                    data-seed="logId"
                >
                </Item> 
            ))}
            </TabBar>           
        )
    }
}
 NavLinkBar.prototype.propTypes = {
        dataList: PropTypes.array
    }
export default NavLinkBar;