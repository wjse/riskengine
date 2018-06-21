import "../../static/scss/login";
import React from "react";
import Ajax from "../service/ajax";
import sha1 from "sha1";
import ReactLoading from "react-loading";

export default class LoginView extends React.Component{
    constructor(props){
        super(props);
        this.state = {isLoading : false};
    };

    componentWillUnmount(){
        this.setState({isLoading : false});
    };

    login(e){
        e.preventDefault();
        let user = {
            username : this.state.username.trim(),
            password : sha1(this.state.password)
        };
        this.setState({isLoading : true});
        new Ajax().post("/login",user).then(this.loginResult.bind(this));
    };

    loginResult(resp){
        if(!resp){
            console.error("Server no response");
            this.setState({isLoading : false});
            return;
        }

        let respData = resp.data;
        if(respData.status == 404){
            this.setError("用户名或密码错误")
        }else{
            this.setError(null);
            this.props.loginResult({
                token : respData.token,
                user : respData.user
            });
        }
    };

    setError(msg){
        this.setState({error : msg , isLoading : false});
    };

    handleInputChange(key){
        this.state[key] = this.refs[key].value;
    };

    formGroup(id , placeHolder , icon , type){
        return (
            <div className="form-group">
                <div className="col-md-12">
                    <input className="form-control"
                           id={id}
                           ref={id}
                           type={type}
                           placeholder={placeHolder}
                           required={true}
                           onChange={this.handleInputChange.bind(this,id)}></input>
                    <i className={"fa " + icon}></i>
                </div>
            </div>
        );
    };

    panelHead(){
        return (
            <div className="panel-heading">
                <h3 className="panel-title">
                    登录
                </h3>
            </div>
        );
    };

    panelBody(){
        return (
            <div className="panel-body">
                <form className="form-horizontal" role="form" onSubmit={this.login.bind(this)}>
                    <p>竹云风险引擎管控平台</p>
                    {this.formGroup("username","用户名","fa-user","text")}
                    {this.formGroup("password","密码","fa-lock","password")}
                    <div className="form-group">
                        <div className="col-md-12">
                            <button className="btn btn-primary btn-block">登录</button>
                            <hr/>
                            <div className={"alert alert-danger " + (this.state.error ? "" : "hide")}>{this.state.error}</div>
                        </div>
                    </div>
                </form>
            </div>
        );
    };

    render(){
        return (
            <section id="login-container">
                <div className="row">
                    <div className="col-md-3" id="login-wrapper">
                        <div className="panel panel-primary animated flipInY">
                            {this.panelHead()}
                            {this.panelBody()}
                        </div>
                    </div>
                </div>
                <ReactLoading type="spokes" color="#1abc9c" className={"loading " + (this.state.isLoading ? "" : "hide")}/>
            </section>
        );
    };
};