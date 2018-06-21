import React from "react";

import Header from "./header";
import Aside from "./aside";
import Main from "./main";

export default class IndexView extends React.Component{

    constructor(props){
        super(props);
        let user = JSON.parse(window.sessionStorage.getItem("user"));
        this.state = {
            user : user
        };
    };

    render(){
        return (
            <section id="container">
                <Header user={this.state.user}/>
                <Aside roleId={this.state.user.roleId}/>
                <Main/>
            </section>
        );
    };
};