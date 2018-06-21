import "../../static/scss/upload.scss";
import React from "react";
import Rc from "rc-upload";
import Config from "../../config";
import ReactLoading from "react-loading";

export default class Uploader extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            preview : props.img,
            isLoading : false
        };
        this.error = this.error.bind(this);
    };

    uploadProps(_this){
        return {
            action : Config.server() + this.props.action,
            headers: {
                Token: window.sessionStorage.getItem("token")
            },
            multiple: true,
            onStart(){
                _this.setState({isLoading : true});
            },
            onSuccess(resp) {
                if(resp){
                    if(resp.status == 200){
                        _this.setState({preview : resp.data});
                        _this.success(resp.data);
                    }else if(resp.status == 404){
                        _this.error("上传文件不存在！");
                    }else if(resp.stats == 415){
                        _this.error("请上传图片格式文件！");
                    }else if(resp.status == 412){
                        _this.error("请上传2MB大小以内的图片");
                    }
                }
                _this.setState({isLoading : false});
            },
            onError(err) {
                console.error('upload error', err);
                _this.setState({isLoading : false});
            }
        };
    };

    error(msg){
        this.props.error(msg);
    };

    success(url){
        this.error(null);
        this.setState({preview : url});
        this.props.success(url);
    };

    render(){
        return (
            <div className="upload">
                <div className="preview">
                    {this.state.preview ? <img src={this.state.preview}/> : ""}
                </div>
                <Rc className="btn btn-primary center-block" {...this.uploadProps(this)}>上传</Rc>
                <ReactLoading type="spokes" color="#1abc9c" className={"loading " + (this.state.isLoading ? "" : "hide")}/>
            </div>
        );
    };
};