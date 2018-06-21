import "../../../static/scss/list.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';
import React from 'react';
import BaseComponent from '../../service/base-component';
import ReactLoading from "react-loading";
import Ajax from "../../service/ajax";
import {confirmAlert} from "react-confirm-alert";
import Converter from "../list/converter/data-source-converter";
import Modal from "../../util/modal";
import FormUtil from "../../util/form-util";
import DataSourceService from "./service/data-source-service";
import Page from "../../util/page";

export default class DataSourceList extends React.Component{

    constructor(props){
        super(props);
        this.a = new Ajax();
        this.c = new Converter();
        this.s = new DataSourceService();
        this.state = {
            data : [] ,
            page : null,
            isLoading : false,
            modalOpen : false,
            clickText : "",
            modalClick : () => {},
            obj : {},
            error : null
        };
    };

    componentWillMount(){
        this.loadData();
    };

    loadData(pageNum){
        this.s.loadDataSource((page) => {
            this.setState({
                data : page.list,
                page : page,
                error : null,
                modalOpen : false
            });
        },pageNum);
    };

    error(msg){
        this.setState({error : msg , isLoading : false});
    };

    save(){
        let obj = this.state.obj;
        for(let k in this.refs){
            obj[k] = this.refs[k].value.trim();
        }

        if(null == obj.name || "" == obj.name){
            this.error("数据源名称不能为空!");
            return;
        }

        if(null == obj.host || "" == obj.host){
            this.error("数据源地址不能为空!");
            return;
        }

        if(null == obj.port || "" == obj.port){
            this.error("数据源端口号不能为空!");
            return;
        }

        if(null == obj.dbName || "" == obj.dbName){
            this.error("数据库名（SID）不能为空!");
            return;
        }

        if(null == obj.username || "" == obj.username){
            this.error("用户名不能为空!");
            return;
        }

        if(null == obj.password || "" == obj.password){
            this.error("密码不能为空!");
            return;
        }

        this.setState({isLoading : true , obj : obj});
        this.a.post("/data-source" , obj).then(() => {
            this.setState({
                modalOpen : false ,
                isLoading : false
            });
            this.loadData();
        });
    };

    update(obj){
        for(let k in this.refs){
            obj[k] = this.refs[k].value.trim();
        }

        if(null == obj.name || "" == obj.name){
            this.error("名称不能为空!");
            return;
        }

        if(null == obj.host || "" == obj.host){
            this.error("地址不能为空!");
            return;
        }

        if(null == obj.port || "" == obj.port){
            this.error("端口号不能为空!");
            return;
        }

        if(null == obj.dbName || "" == obj.dbName){
            this.error("数据库名（SID）不能为空!");
            return;
        }

        if(null == obj.username || "" == obj.username){
            this.error("用户名不能为空!");
            return;
        }

        if(null == obj.password || "" == obj.password){
            this.error("密码不能为空!");
            return;
        }

        this.setState({isLoading : true , obj : obj});
        this.a.put("/data-source" , obj).then(() => {
            this.setState({
                modalOpen : false ,
                isLoading : false
            });
            this.loadData();
        });
    };

    delete(obj){
        confirmAlert({
            title : "提示",
            message : "确定删除数据源 : "+ obj.name +"？",
            buttons : [{
                label : "确定",
                onClick : () => {
                    this.a.delete("/data-source/" + obj.id).then((resp) => {
                        if(resp.data.status == 200){
                            this.loadData();
                        }else if(resp.data.status == 403){
                            confirmAlert({
                                title : "提示",
                                message : "无法删除该数据源，其正在使用中！",
                                buttons : [{
                                    label : "确定"
                                }]
                            });
                        }
                    });
                }
            },{
                label : "取消"
            }]
        });
    };

    modStatus(obj){
        let status = obj.status == "STARTUP" ? "SHUTDOWN" : "STARTUP";
        let msg = (status == "STARTUP" ? "启用" : "停用") + obj.name;

        confirmAlert({
            title : "提示",
            message : "确定" + msg + "？",
            buttons : [{
                label : "确定",
                onClick : () => {
                    this.a.put("/data-source/status/" + obj.id + "?status=" + status).then(() => {
                        this.loadData();
                    });
                }
            },{
                label : "取消"
            }]
        });
    };

    openModal(obj , clickText, callback){
        this.setState({
            modalOpen: true,
            obj: obj,
            clickText : clickText,
            modalClick : callback,
            error : null
        });
    };

    tableColumns(obj){
        let array = [obj.name, this.c.status(obj.status),
                     obj.type, obj.host , obj.port , obj.dbName];

        let items = array.map((o, i) => {
            return (
                <td key={i}>{o}</td>
            );
        });

        items.push((
            <td key="-1" className="center">
                <i className="fa fa-edit" onClick={this.openModal.bind(this, obj , "修改" ,this.update.bind(this , obj))}>修改</i>
                <i className={"fa fa-" + (obj.status == "STARTUP" ? "cloud-download" : "cloud-upload")}
                    onClick={this.modStatus.bind(this, obj)}>{obj.status == "STARTUP" ? "停用" : "启用"}</i>
                <i className="fa fa-times" onClick={this.delete.bind(this, obj)}>删除</i>
            </td>
        ));

        return items;
    };

    modalBody(){
        return (
            <form className="form-horizontal">
                {
                    FormUtil.formGroup({name : "name" , label : "名称" , isRequired : true}, FormUtil.formInput({
                        name : "name",
                        value : this.state.obj.name
                    }))
                }
                {
                    FormUtil.formGroup({name : "type" , label : "类型" , isRequired : true}　, FormUtil.formSelect({
                        name : "type",
                        value : this.state.obj.type,
                        options : this.c.typeArray()
                    }))
                }
                {
                    FormUtil.formGroup({name : "host" , label : "地址" , isRequired : true}, FormUtil.formInput({
                        name : "host",
                        value : this.state.obj.host,
                        onChange : FormUtil.textWithoutChineseCheck
                    }))
                }
                {
                    FormUtil.formGroup({name : "port" , label : "端口号" , isRequired : true} , FormUtil.formInput({
                        name : "port",
                        type : "tel",
                        maxLength : 20,
                        value : this.state.obj.port,
                        onChange : FormUtil.numberCheck
                    }))
                }
                {
                    FormUtil.formGroup({name : "dbName" , label : "数据库名(SID)" , isRequired : true} , FormUtil.formInput({
                        name : "dbName",
                        value : this.state.obj.dbName,
                        onChange : FormUtil.textWithoutChineseCheck
                    }))
                }
                {
                    FormUtil.formGroup({name : "username" , label : "用户名" , isRequired : true} , FormUtil.formInput({
                        name : "username",
                        value : this.state.obj.username,
                        onChange : FormUtil.textWithoutChineseCheck
                    }))
                }
                {
                    FormUtil.formGroup({name : "password" , label : "密码" , isRequired : true} , FormUtil.formInput({
                        type : "password",
                        name : "password",
                        value : this.state.obj.password
                    }))
                }
                {
                    FormUtil.formGroup({name : "description" , label : "描述"} , FormUtil.formTextArea({
                        name : "description",
                        maxLength : 200,
                        value : this.state.obj.description
                    }))
                }
                <div className={"alert alert-danger " + (this.state.error ? "" : "hide")}>{this.state.error}</div>
            </form>
        );
    };

    render(){
        return (
            <section id="main-content">
                {BaseComponent.pageHeader("动态配置" , "数据源管理")}
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <a className="btn btn-square btn-primary pull-right" onClick={this.openModal.bind(this,{} , "新增", this.save.bind(this))}>
                                    新增
                                    <i className="fa fa-plus"></i>
                                </a>
                            </div>
                            <div className="panel-body">
                                {BaseComponent.tableBody(this.props.thead,this.state.data,this.tableColumns.bind(this))}
                                <Page data={this.state.page} click={this.loadData.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactLoading type="spokes" color="#1abc9c" className={"loading " + (this.state.isLoading ? "" : "hide")}/>
                <Modal isOpen={this.state.modalOpen}
                       title={this.state.clickText}
                       body={<div>{this.modalBody()}</div>}
                       click={this.state.modalClick}
                       close={() => {this.loadData()}}
                       clickText={this.state.clickText}/>
            </section>
        );
    };
};

DataSourceList.defaultProps = {
    thead: ["名称", "状态", "类型", "地址","端口号","数据库名（SID）", "操作"]
};