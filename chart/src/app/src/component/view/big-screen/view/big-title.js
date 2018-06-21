import React from "react";

export default class BigTitle extends React.Component{

    render(){
        return (
            <div id="bigTitle">
                <div id="text" className="box-below">
                    风险拦截总量
                </div>
                <div id="title">
                    <span>2</span>
                    <span>0</span>
                    <span>5</span>
                    <span>3</span>
                    <span id="mini">个</span>
                </div>
            </div>
        );
    };
};