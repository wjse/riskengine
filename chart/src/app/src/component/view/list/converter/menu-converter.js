import Converter from "./converter";
import React from "react";

export default class MenuConverter extends Converter{

    constructor(){
        super();
        this.typeData = {
            c : "组件",
            p : "父级",
            a : "链接",
        };
    };

    type(type){
        return this.typeData[type];
    };

    typeOptions(){
        let options = [];
        for(let k in this.typeData){
            options.push({
                name : this.typeData[k],
                value : k
            })
        }
        return options;
    };

    targetRadio(){
        return [
            {name : "内嵌网页" , value : "iFrame"},
            {name : "新窗口打开网页" , value : "_blank"}
        ];
    };

    icon(icon){
        return <i className={"fa fa-"+icon}></i>
    };
};