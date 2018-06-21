import "../../../static/scss/list.scss";
import React from "react";
import Ajax from "../../service/ajax";
import Converter from "./converter/menu-converter";
import DashboardPanel from "../dashboard/panel";
import FormUtil from "../../util/form-util";
import Modal from "../../util/modal";
import IconItems from "../../util/icon-items";
import {confirmAlert} from "react-confirm-alert";
import BaseComponent from "../../service/base-component";


export default class MenuListView extends React.Component{

    constructor(props){
        super(props);
        this.a = new Ajax();
        this.c = new Converter();
        this.state = {
            data : [],
            obj : {},
            modalOpen : false,
            modalTitle : "",
            modalCallback : () => {},
            error : null,
            tempIcon : null,
            inner : false,
            blank : false
        };
    };

    componentWillMount(){
        this.loadMenus();
    };

    loadMenus(){
        this.a.get("/menu?isParent=true").then((resp) => {
            if(resp && resp.data.data){
                this.setState({data : resp.data.data});
            }
        });
    };

    save(parent){
        this.setState({error : null});

        let obj = this.state.obj;
        if(!obj.name.trim() || "" == obj.name.trim()){
            this.setState({error : "菜单名称不能为空！"});
            return;
        }

        if(!obj.path.trim() || "" == obj.path.trim()){
            this.setState({error : "菜单路径不能为空！"});
            return;
        }

        if(parent && parent.id){
            obj.parentId = parent.id;
        }

        this.a.post("/menu" , obj).then((resp) => {
            if(resp && resp.data){
                if(resp.data.status == 200){
                    this.setState({modalOpen : false});
                    this.loadMenus();
                }else if(resp.data.status == 403){
                    this.setState({error : "菜单名称已存在！"});
                }else{
                    this.setState({error : "系统错误！"});
                }
            }
        });
    };

    update(menu){
        this.setState({error : null});

        if(!menu.name.trim() || "" == menu.name.trim()){
            this.setState({error : "菜单名称不能为空！"});
            return;
        }

        if(!menu.path.trim() || "" == menu.path.trim()){
            this.setState({error : "菜单路径不能为空！"});
            return;
        }

        this.a.put("/menu" , menu).then((resp) => {
            if(resp && resp.data){
                if(resp.data.status == 200){
                    this.setState({modalOpen : false});
                    this.loadMenus();
                }else if(resp.data.status == 403){
                    this.setState({error : "菜单名称已存在！"});
                }else{
                    this.setState({error : "系统错误！"});
                }
            }
        });
    };

    delete(menu){
        confirmAlert({
            title : "提示",
            message : "确定删除菜单 : "+ menu.name +"？",
            buttons : [{
                label : "确定",
                onClick : () => {
                    this.a.delete("/menu/" + menu.id).then(() => {
                        this.loadMenus();
                    });
                }
            },{
                label : "取消"
            }]
        });
    };

    openModal(title , menu , callback){
        let state = this.state;
        state.modalOpen = true;
        state.modalTitle = title;
        state.obj = menu;
        state.modalCallback = callback;

        if("a" == menu.type){
            state[menu.target] = true;
        }
        this.setState(state);
    };

    tableBody(){
        return (
            <div className="dd">
                <ol className="dd-list">
                    {this.menuList(this.state.data)}
                </ol>
            </div>
        );
    };

    menuList(menuList){
        if(!menuList){
            return;
        }
        return menuList.map((menu , i) => {
            return (
                <li key={i} className="dd-item" data-id={menu.id}>
                    <div className="dd-handle">
                        <p>
                            {menu.icon ? <i className={"fa fa-" + menu.icon}></i> : ""}
                            {menu.name}
                        </p>
                    </div>
                    <div className="actions pull-right">
                        <i key={Math.random()} className="fa fa-edit" onClick={this.openModal.bind(this,"修改", menu , this.update.bind(this,menu))}>修改</i>
                        <i key={Math.random()} className="fa fa-times" onClick={this.delete.bind(this,menu)}>删除</i>
                        <i key={Math.random()} className="fa fa-plus" onClick={this.openModal.bind(this,"新增",{} , this.save.bind(this,menu))}>新增</i>
                    </div>
                    {menu.hasChildren ? <ol className="dd-list">{this.menuList(menu.children)}</ol> : ""}
                </li>
            );
        })
    };

    addButton(){
        return (
            <div className="actions pull-right">
                <a className="btn btn-primary" onClick={this.openModal.bind(this,"新增", {} ,this.save.bind(this))}>
                    新增
                    <i key={Math.random()} className="fa fa-plus"></i>
                </a>
            </div>
        );
    };

    modalBody(){
        return (
            <form className="form-horizontal" id="menuForm">
                {
                    FormUtil.formGroup({name : "name" , label : "名称" , isRequired : true},FormUtil.formInput({
                        name : "name",
                        maxLength : 100,
                        value : this.state.obj.name,
                        onChange : () => {this.state.obj.name = this.refs.name.value;}
                    }))
                }
                {
                    FormUtil.formGroup({name : "path" , label : "路径" , isRequired : true},FormUtil.formInput({
                        name : "path",
                        maxLength : 100,
                        value : this.state.obj.path,
                        onChange : () => {this.state.obj.path = this.refs.path.value;}
                    }))
                }
                {
                    FormUtil.formGroup({name : "icon" , label : "图标"}, FormUtil.formInput({
                        name : "icon",
                        maxLength : 100,
                        value : this.state.obj.icon,
                        placeholder : "请根据图标参考表中填入图标代码",
                        onChange : () => {this.state.obj.icon = this.refs.icon.value;}
                    }))
                }
                {
                    FormUtil.formGroup({name : "type" , label : "类型"},FormUtil.formSelect({
                        name : "type",
                        value : this.state.obj.type,
                        options : this.c.typeOptions(),
                        onChange : () => {
                            let obj = this.state.obj;
                            obj.type = this.refs["type"].value;
                            this.setState({obj : obj});
                        }
                    }))
                }
                {
                    this.state.obj.type == "a" ? this.targetRadio() : ""
                }
                {
                    FormUtil.formGroup({name : "sort" , label : "排序"} , FormUtil.formInput({
                            name : "sort",
                            value : this.state.obj.sort,
                            type : "tel",
                            placeholder : "0~99的正整数",
                            onChange : FormUtil.numberCheck,
                            maxLength : 2,
                            onChange : () => {this.state.obj.sort = this.refs.sort.value;}
                        })
                    )
                }
                <div className={"alert alert-danger " + (this.state.error ? "" : "hide")}>{this.state.error}</div>
            </form>
        );
    };

    targetRadio(){
        return (<div className="form-group clearfix">
            <label className="col-sm-2 control-label" htmlFor="target">
                打开方式
            </label>
            <div className="col-sm-10">
                {this.c.targetRadio().map(((obj , i) => {
                    return (
                        <div className="radio" key={i}>
                            <label>
                                <input type="radio" ref="target"
                                       checked={this.state[obj.value]}
                                       name="target" defaultValue={obj.value}
                                       onChange={() => {
                                           let state = this.state;
                                           state.obj.target = obj.value;
                                           state.inner = false;
                                           state.blank = false;
                                           state[obj.value] = true;
                                           this.setState(state);
                                       }}/>
                                {obj.name}
                            </label>
                        </div>
                    );
                }))}
            </div>
        </div>);
    };

    closeModal(){
        this.setState({
            error : "",
            modalOpen : false,
            obj : {}
        });
        this.loadMenus();
    };

    render(){
        return (
            <section id="main-content">
                {BaseComponent.pageHeader("系统管理","菜单管理")}
                <div className="row">
                    <DashboardPanel right={this.addButton()} width="5" body={this.tableBody()}/>
                    <IconItems width="7"/>
                </div>
                <Modal isOpen={this.state.modalOpen}
                       title={this.state.modalTitle}
                       body={this.modalBody()}
                       click={this.state.modalCallback.bind(this)}
                       clickText={this.state.modalTitle}
                       close={this.closeModal.bind(this)}/>
            </section>
        );
    };
};