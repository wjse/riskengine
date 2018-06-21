import "../../../static/scss/list.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';
import React from "react";
import ReactLoading from "react-loading";
import Ajax from "../../service/ajax";
import Converter from "./converter/user-converter";
import Modal from "../../util/modal";
import FormUtil from "../../util/form-util";
import {confirmAlert} from "react-confirm-alert";
import BaseComponent from "../../service/base-component";
import Page from "../../util/page";

export default class UserListView extends React.Component{

    constructor(props){
        super(props);
        this.c = new Converter();
        this.a = new Ajax();
        this.state = {
            isLoading: false,
            modalOpen : false,
            obj : {},
            page : null,
            data : [],
            modalClick : () => {},
            clickText : "",
            roleList : [{name : "" , value : null}],
            isSave : false,
            error : null
        };
    };

    componentWillMount(){
        this.loadUsers();
        this.loadRole();
    };

    loadUsers(pageNum){
        if(!pageNum){
            pageNum = 1;
        }
        this.a.get("/user?pageNum=" + pageNum).then((resp) => {
            if(resp && resp.data){
                this.setState({
                    data : resp.data.data.list,
                    page : resp.data.data,
                    error : null
                });
            }
        });
    };

    tableBody(){
        return (
            <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                <thead>
                    <tr>
                        {
                            this.props.thead.map((head, i) => {
                                return <th key={i} className={i == (this.props.thead.length - 1) ? "center" : ""}>{head}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.data.map((obj, i) => {
                        if(!obj.role){
                            obj.role = {};
                        }
                        return <tr key={i} id={"data-" + obj.id}>{this.tableColumns(obj)}</tr>
                    })
                }
                </tbody>
            </table>
        );
    };

    tableColumns(obj){
        let array = [obj.username, obj.nickName, this.c.status(obj.status),
                     obj.email, obj.mobile, obj.role.name , this.c.date(obj.createTime)];

        let items = array.map((o, i) => {
            return (
                <td key={i}>{o}</td>
            );
        });

        items.push((
            <td key="-1" className="center">
                {obj.type == 0 ? "NA" : <i className="fa fa-edit" onClick={this.openModal.bind(this, obj , "修改" , false ,this.update.bind(this , obj))}>修改</i>}
                {obj.type == 0 ? "" : <i className="fa fa-refresh" onClick={this.resetPassword.bind(this, obj)}>密码重置</i>}
                {obj.type == 0 ? "" : <i className="fa fa-times" onClick={this.delete.bind(this, obj)}>删除</i>}
            </td>
        ));

        return items;
    };

    resetPassword(user){
        confirmAlert({
            title : "提示",
            message : "确定重置该用户密码为初始密码123456？",
            buttons : [{
                label : "确定",
                onClick : () => {
                    this.a.put("/user/password/" + user.id).then(() => {
                        this.loadUsers();
                    });
                }
            },{
                label : "取消"
            }]
        });
    };

    openModal(obj , clickText , isSave, callback) {
        this.setState({
            modalOpen: true,
            obj: obj,
            clickText : clickText,
            modalClick : callback,
            isSave : isSave
        });
    };

    delete(obj){
        confirmAlert({
            title : "提示",
            message : "确定删除用户 : "+ obj.username +"？",
            buttons : [{
                label : "确定",
                onClick : () => {
                    this.a.delete("/user/" + obj.id).then(() => {
                        this.loadUsers();
                    });
                }
            },{
                label : "取消"
            }]
        });
    };

    update(obj){
        for(let k in this.refs){
            obj[k] = this.refs[k].value.trim();
        }

        if(null == obj.username || "" == obj.username){
            this.error("账号不能为空!");
            return;
        }

        if(null == obj.nickName || "" == obj.nickName){
            this.error("昵称不能为空!");
            return;
        }

        this.a.put("/user",obj).then((resp) => {
            if(resp){
                this.setState({isLoading : false});
                if(resp.status == 403){
                    this.error("账号已存在，请重新输入!");
                }else if(resp.status == 404){
                    this.error("用户不存在!");
                }else if(resp.status == 200){
                    this.setState({
                        modalOpen : false
                    });
                    this.loadUsers();
                }
            }
        });
    };

    save(){
        let obj = this.state.obj;
        for(let k in this.refs){
            obj[k] = this.refs[k].value.trim();
        }

        if(null == obj.username || "" == obj.username){
            this.error("账号不能为空!");
            return;
        }

        if(null == obj.nickName || "" == obj.nickName){
            this.error("昵称不能为空!");
            return;
        }

        this.setState({isLoading : true , obj : obj});
        this.a.post("/user",obj).then((resp) => {
            if(resp){
                this.setState({isLoading : false});
                if(resp.data.status == 403){
                    this.error("账号已存在，请重新输入!");
                }else if(resp.data.status == 200){
                    this.setState({
                        modalOpen : false
                    });
                    this.loadUsers();
                }
            }
        });
    };

    loadRole(){
        this.a.get("/role").then((resp) => {
            if(resp && resp.data && resp.data.data){
                let roleList = this.state.roleList;
                resp.data.data.forEach((role) => {
                    roleList.push({
                        value : role.id,
                        name : role.name
                    });
                });
                this.setState({roleList : roleList});
            }
        });
    };

    error(msg){
        this.setState({error : msg , isLoading : false});
    };

    modalBody(){
        return (
            <form className="form-horizontal">
                {
                    FormUtil.formGroup({name : "username" , label : "账号" , isRequired : true}, FormUtil.formInput({
                        name : "username",
                        maxLength : 100,
                        value : this.state.obj.username
                    }))
                }
                {
                    FormUtil.formGroup({name : "nickName" , label : "昵称" , isRequired : true} , FormUtil.formInput({
                        name : "nickName",
                        maxLength : 100,
                        value : this.state.obj.nickName
                    }))
                }
                {
                    FormUtil.formGroup({name : "status" , label : "状态"}, FormUtil.formSelect({
                        disabled : this.state.clickText == "新增" ? true : false,
                        name : "status",
                        value : this.state.obj.status,
                        options : this.c.statusArray()
                    }))
                }
                {
                    FormUtil.formGroup({name : "email" , label : "邮箱"} , FormUtil.formInput({
                        type : "email",
                        name : "email",
                        maxLength : 100,
                        value : this.state.obj.email
                    }))
                }
                {
                    FormUtil.formGroup({name : "mobile" , label : "电话"} , FormUtil.formInput({
                        type : "tel",
                        name : "mobile",
                        maxLength : 11,
                        placeholder : "请输入数字",
                        onChange : FormUtil.numberCheck,
                        value : this.state.obj.mobile
                    }))
                }
                {
                    FormUtil.formGroup({name : "roleId" , label : "角色"}　, FormUtil.formSelect({
                        name : "roleId",
                        value : this.state.obj.roleId,
                        options : this.state.roleList
                    }))
                }
                <div className={"alert alert-danger " + (this.state.error ? "" : "hide")}>{this.state.error}</div>
                {this.state.isSave ?<div className={"alert alert-info"}>新增用户默认密码为"123456"</div>　:""}
            </form>
        );
    };

    render(){
        return (
            <section id="main-content">
                {BaseComponent.pageHeader("系统管理","用户管理")}
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <a className="btn btn-square btn-primary pull-right" onClick={this.openModal.bind(this,{} , "新增" , true, this.save.bind(this))}>
                                    新增
                                    <i className="fa fa-plus"></i>
                                </a>
                            </div>
                            <div className="panel-body">
                                {this.tableBody()}
                                <Page data={this.state.page} click={this.loadUsers.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactLoading type="spokes" color="#1abc9c" className={"loading " + (this.state.isLoading ? "" : "hide")}/>
                <Modal isOpen={this.state.modalOpen}
                       title={this.state.clickText}
                       body={<div>{this.modalBody()}</div>}
                       click={this.state.modalClick}
                       close={() => this.setState({modalOpen : false , isLoading : false , error : "" , obj:{}})}
                       clickText={this.state.clickText}/>
            </section>
        );
    };
};

UserListView.defaultProps = {
    thead: ["账号", "昵称", "状态", "邮箱", "电话号码","角色", "创建时间", "操作"]
};