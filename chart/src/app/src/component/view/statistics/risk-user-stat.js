import "../../../static/scss/list.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';
import React from "react";
import ReactLoading from "react-loading";
import Ajax from "../../service/ajax";
import Converter from "./../list/converter/user-converter";
import {confirmAlert} from "react-confirm-alert";
import BaseComponent from "../../service/base-component";
import Page from "../../util/page";

export default class RiskUserStatView extends React.Component{

    constructor(props){
        super(props);
        this.c = new Converter();
        this.a = new Ajax();
        this.state = {
            isLoading: false,
            obj : {},
            data : [],
            page : null,
            clickText : "",
            isSave : false,
            error : null
        };
    };

    componentWillMount(){
        this.loadUsers();
    };

    loadUsers(pageNum){
        if(!pageNum){
            pageNum = 1;
        }
        this.a.get("/statistics/risk-user-stat?pageNum=" + pageNum).then((resp) => {
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
                        return <tr key={i} id={"data-" + obj.id}>{this.tableColumns(obj)}</tr>
                    })
                }
                </tbody>
            </table>
        );
    };

    tableColumns(obj){
        let array = [obj.userId, obj.type,obj.message];

        let items = array.map((o, i) => {
            return (
                <td key={i}>{o}</td>
            );
        });

        items.push((
            <td key="-1" className="center">
                {<i className="fa fa-times" onClick={this._delete.bind(this, obj)}>删除</i>}
            </td>
        ));

        return items;
    };

    _delete(obj){
        confirmAlert({
            title : "提示",
            message : "确定删除该用户？",
            buttons : [{
                label : "确定",
                onClick : () => {
                    this.a.delete("/statistics/risk-user-stat/" + obj.id).then(() => {
                        this.loadUsers();
                    });
                }
            },{
                label : "取消"
            }]
        });
    };

    error(msg){
        this.setState({error : msg , isLoading : false});
    };

    render(){
        return (
            <section id="main-content">
                {BaseComponent.pageHeader("统计","离线风险统计")}
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                {this.tableBody()}
                                <Page data={this.state.page} click={this.loadUsers.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactLoading type="spokes" color="#1abc9c" className={"loading " + (this.state.isLoading ? "" : "hide")}/>
            </section>
        );
    };
};

RiskUserStatView.defaultProps = {
    thead: ["账号", "风险因素","风险信息", "操作"]
};