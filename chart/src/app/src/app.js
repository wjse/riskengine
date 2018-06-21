import "bootstrap";
import "font-awesome-webpack";
import React from "react";
import ReactDom from 'react-dom';

import Ajax from "./component/service/ajax";
import Login from "./component/view/login";
import Index from "./component/view/index/index";
import PubSub from "pubsub-js";

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    };

    componentWillMount(){
        this.pubToken = PubSub.subscribe("isLogin" , (topic , isLogin) => {
            this.setState({
                isLogin: isLogin
            });
        });

        let token = this.props.token;
        if(!token){
            this.setState({
                isLogin : false
            });
        }else{
            new Ajax().get("/login",{token : token}).then((resp) => {
                if(resp){
                    this.setState({isLogin : resp.data});
                }
            });
        }
    };

    loginResult(result){
        if(result && result.token){
            window.sessionStorage.setItem("token" , result.token);
            window.sessionStorage.setItem("user" , JSON.stringify(result.user));

            this.setState({
                isLogin : true
            });
        }
    };

    componentWillUnmount(){
        PubSub.unsubscribe(this.pubToken);
    };

    render(){
        if(this.state.isLogin){
            return <Index/>;
        }

        return <Login loginResult={this.loginResult.bind(this)}/>;
    };
};

ReactDom.render(<App token={window.sessionStorage.getItem("token")}/> , document.getElementById("app"));