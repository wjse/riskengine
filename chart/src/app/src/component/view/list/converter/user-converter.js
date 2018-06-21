import Converter from "./converter";
import React from "react";

export default class UserConverter extends Converter{

    img(path){
        return <img className="img-circle" src={path}/>
    };
};