import "../../../static/scss/index-header.scss";
import React from "react";
import PubSub from "pubsub-js";
import PropTypes from "prop-types";
import Modal from "../../util/modal";

import Ajax from "../../service/ajax";
import sha1 from "sha1";
import FormUtil from "../../util/form-util";

export default class IndexHeader extends React.Component{

    constructor(props){
        super(props);
        this.a = new Ajax();
        this.state = {
            isAsideShow : true,
            modalOpen : false,
            user : props.user,
            which : "base",
            modalClick : () => {}
        };
    };

    brand(){
        return (
            <div className="brand">
                <a className="logo">
                    <span>竹云风险引擎</span>
                </a>
            </div>
        );
    };

    isShowAside(){
        let isShow = !this.state.isAsideShow;
        PubSub.publish("index.header.isShowAside" , isShow);
        this.setState({
            isAsideShow : isShow
        });
    };

    toggleNav(){
        return (
            <div className="toggle-navigation toggle-left">
                <a className="btn btn-default"
                        id="toggle-left"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Toggle Navigation"
                        onClick={this.isShowAside.bind(this)}>
                    <i className="fa fa-bars"></i>
                </a>
            </div>
        );
    };

    userNav() {
        return (
            <div className="user-nav">
                <ul>
                    <li className="dropdown settings">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <span id="nickName">{this.state.user.nickName}</span>
                        </a>
                        <ul className="dropdown-menu animated fadeInDown">
                            <li>
                                <a onClick={this.openModal.bind(this , this.updateProfile.bind(this))}><i className="fa fa-user"></i>用户信息</a>
                            </li>
                            <li onClick={this.logout.bind(this)}>
                                <a><i className="fa fa-power-off"></i>注销</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    };

    logout(){
        this.a.delete("/login?token=" + window.sessionStorage.getItem("token")).then(() => {
            window.sessionStorage.removeItem("token");
            window.sessionStorage.removeItem("user");
            window.location.reload();
        });
    };

    openModal(callback){
        this.setState({
            modalOpen : true,
            error : null,
            modalClick : callback
        });
    };
    
    inputError(inputValue , msg){
        if(!inputValue) {
            this.error(msg);
            return true;
        }
        
        return false;
    };

    updateProfile(){
        let nickName = this.refs.nickName.value.trim() ,
            email = this.refs.email.value.trim(),
            mobile = this.refs.mobile.value.trim();
        if(this.inputError(nickName , "昵称输入有误！")) {
            return;
        }

        let user = this.state.user;
        user.nickName = nickName;
        user.email = email;
        user.mobile = mobile;

        this.a.put("/profile" , user).then((resp) => {
              if(resp.data.status == 200){
                  window.sessionStorage.setItem("user" , JSON.stringify(user));
                  this.setState({
                      user : user,　
                      modalOpen : false
                  });
              }
        });
    };

    updatePassword(){
        if(!this.refs.sourcePassword || !this.refs.sourcePassword.value){
            this.setState({error: "原密码输入有误！"});
            return;
        }

        let sourcePassword = this.refs.sourcePassword.value;

        if(!this.refs.password || !this.refs.password.value){
            this.setState({error: "新密码输入有误！"});
            return;
        }

        if(this.refs.password.value.length < 6){
            this.setState({error: "新密码个数小于6位！"});
            return;
        }

        let password = this.refs.password.value;

        if(!this.refs.confirmPassword || !this.refs.confirmPassword.value){
            this.setState({error: "确认密码输入有误！"});
            return;
        }

        let confirmPassword = this.refs.confirmPassword.value;

        if(password != confirmPassword){
            this.setState({error: "新密码与确认密码不一致！"});
            return;
        }

        this.a.put("/profile/password/" + this.state.user.id , {
            sourcePassword : sha1(sourcePassword),
            password : sha1(password)
        }).then((resp) => {
            if(resp.data.status == 404){
                this.setState({error: "用户不存在！"});
                return;
            }

            if(resp.data.status == 403){
                this.setState({error: "原密码错误！"});
                return;
            }

            this.logout();
        });
    };

    which(value , callback){
        this.setState({
            which : value,
            modalClick : callback
        });
    };

    modalTabs(){
        return (
            <ul className="nav nav-tabs">
                <li className="active">
                    <a href="#base" data-toggle="tab" onClick={this.which.bind(this , "base" , this.updateProfile.bind(this))}>基本信息</a>
                </li>
                <li>
                    <a href="#updatePassword" data-toggle="tab" onClick={this.which.bind(this , "password" , this.updatePassword.bind(this))}>修改密码</a>
                </li>
            </ul>
        );
    };

    error(msg){
        this.setState({error : msg});
    };

    modalProfileBase() {
        return (
            <div id="base" className="tab-pane active">
                <form className="form-horizontal">
                    {
                        FormUtil.formGroup({
                            name : "nickName",
                            label : "昵称" ,
                            isRequired : true
                        },
                        FormUtil.formInput({
                            name : "nickName" ,
                            value : this.state.user.nickName ,
                            maxLength : 100
                        }))
                    }
                    {
                        FormUtil.formGroup({
                            name : "email" ,
                            label : "邮箱"
                        },
                        FormUtil.formInput({
                            name : "email" ,
                            value : this.state.user.email ,
                            maxLength : 100
                        }))
                    }
                    {
                        FormUtil.formGroup({
                            name : "mobile" ,
                            label : "电话"
                        },
                        FormUtil.formInput({
                            name : "mobile" ,
                            type : "tel",
                            onChange : FormUtil.numberCheck,
                            value : this.state.user.mobile ,
                            maxLength : 11
                        }))
                    }
                </form>
            </div>
        );
    };

    modalProfilePassword(){
        return (
            <div id="updatePassword" className="tab-pane">
                <form className="form-horizontal">
                    {
                        FormUtil.formGroup({
                            name : "sourcePassword" ,
                            label : "原密码" ,
                            isRequired : true
                        } ,
                        FormUtil.formInput({
                            name : "sourcePassword" ,
                            type : "password" ,
                            maxLength : 100
                        }))
                    }
                    {
                        FormUtil.formGroup({
                            name : "password" ,
                            label : "新密码" ,
                            isRequired : true
                        } ,
                        FormUtil.formInput({
                            name : "password" ,
                            type : "password" ,
                            maxLength : 100,
                            placeholder : "6位以上任意字符"
                        }))
                    }
                    {
                        FormUtil.formGroup({
                            name : "confirmPassword" ,
                            label : "确认密码" ,
                            isRequired : true
                        } ,
                        FormUtil.formInput({
                            name : "confirmPassword" ,
                            type : "password" ,
                            maxLength : 100,
                            placeholder : "6位以上任意字符"
                        }))
                    }
                </form>
            </div>
        );
    };

    modalBody(){
        return (
            <div className="tab-wrapper tab-primary">
                {this.modalTabs()}
                <div className="tab-content">
                    {this.modalProfileBase()}
                    {this.modalProfilePassword()}
                </div>
                <div className={"alert alert-danger alert-dismissable" + (this.state.error ? "" : " hide")}>
                    <a className="close" data-dismiss="alert" aria-hidden="true">×</a>
                    <strong>警告!</strong>{this.state.error}
                </div>
            </div>
        );
    };

    render(){
        return (
            <header id="header">
                {this.brand()}
                {this.props.withoutToggleNav ? "" : this.toggleNav()}
                {this.userNav()}
                <Modal isOpen={this.state.modalOpen}
                       title="用户信息"
                       body={this.modalBody()}
                       click={this.state.modalClick.bind(this)}
                       close={() => this.setState({modalOpen : false})}
                       clickText="修改"/>
            </header>
        );
    };
}

IndexHeader.propTypes = {
    user :PropTypes.object.isRequired,
    withoutToggleNav : PropTypes.bool
};
