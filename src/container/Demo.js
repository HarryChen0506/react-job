//面板页面

import React from 'react';
import { Link, BrowserRouter, Route, Switch} from 'react-router-dom';
import Counter from 'container/Counter.js';

function Page1(){
    return(
        <div>页面1：内容</div>     
    )
}
function Page2(){
    return(
        <div>页面2：内容</div>     
    )
}
class Demo extends React.Component{
    render(){
         return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/dashboard/">计数器</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/page1">页面1</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/page2">页面2</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route path="/dashboard/" exact component={Counter} />
                        <Route path="/dashboard/page1" component={Page1} />
                        <Route path="/dashboard/page2" component={Page2} />
                    </Switch>
                </div>               
            </BrowserRouter>     
        )
    }   
}
export default Demo;