import React from "react";

export default class FormUtil{

    static formSelect(config){
        return (
            <div key={Math.random()} className={"col-sm-" + (config.width ? config.width : 10)}>
                <select key={Math.random()}
                        className="form-control"
                        name={config.name}
                        ref={config.name}
                        defaultValue={config.value}
                        onChange={config.onChange}
                        disabled={config.disabled ? config.disabled : ""}>
                    {Array.from(config.options).map((option , i) => {
                        return (<option key={i} value={option.value}>{option.name}</option>);
                    })}
                </select>
            </div>
        );
    };

    static formTextArea(config){
        return (
            <div key={Math.random()} className="col-sm-10">
                <textarea className="form-control"
                          key={Math.random()}
                          name={config.name}
                          ref={config.name}
                          disabled={config.disabled}
                          defaultValue={config.value}
                          maxLength={config.maxLength ? config.maxLength : ""}/>
            </div>
        );
    };

    static minus(){
        return (
            <div key={Math.random()} className="col-sm-1">
               <span style={{display: "block", paddingTop: "8px"}}>
                   <i className="fa fa-minus"></i>
               </span>
            </div>
        );
    };

    static formGroup(config , ...formComponent){
        return (
            <div key={Math.random()} className={(config.error ? "has-error " : "") + "form-group clearfix"}>
                <label className="col-sm-2 control-label" htmlFor={config.name}>
                    {config.label}
                    {config.isRequired == true ? <span style={{color : "red"}}>*</span> : ""}
                </label>
                {formComponent.map((fc) => {
                    return fc;
                })}
            </div>
        );
    };

    static formInput(config){
        return (
            <div key={Math.random()} className={"col-sm-" + (config.inputWidth ? config.inputWidth : "10")}>
                {this.input(config)}
            </div>
        );
    };

    static input(config){
        return (
            <input className="form-control"
                   name={config.name}
                   ref={config.name}
                   defaultValue={config.value}
                   type={config.type ? config.type : "text"}
                   placeholder={config.placeholder ? config.placeholder : ""}
                   maxLength={config.maxLength ? config.maxLength : 100}
                   onChange={config.onChange ? config.onChange : null}
                   onClick={config.onClick ? config.onClick : null}
                   min={config.min ? config.min : ""}
                   max={config.max ? config.max : ""}
                   disabled={config.disabled ? config.disabled : ""}
                   key={Math.random()}/>
        );
    };

    static  numberCheck(proxy){
        let value = proxy.target.value;
        if("" == value || null == value){
            proxy.target.value = "";
        }else if(!/^[0-9]*$/.test(value)){
            let str = "";
            for(let i = 0 ; i < value.length ; i++){
                if(/^[0-9]*$/.test(value[i])){
                    str += value[i];
                }
            }
            proxy.target.value = str;
        }
    };

    static textWithoutChineseCheck(proxy){
        let value = proxy.target.value;
        if("" == value || null == value){
            proxy.target.value = "";
        }else if(/^[\u4e00-\u9fa5]*$/.test(value)){
            proxy.target.value = "";
        }
    };
};