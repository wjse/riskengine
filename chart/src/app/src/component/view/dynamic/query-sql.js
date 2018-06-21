import "../../../static/scss/list.scss";
import React from "react";
import Ajax from "../../service/ajax";
import BaseComponent from "../../service/base-component";
import Modal from "../../util/modal";
import ReactLoading from "react-loading";
import {confirmAlert} from "react-confirm-alert";
import QuerySqlService from "./service/query-sql-service";
import DataSourceService from "./service/data-source-service";
import Page from "../../util/page";

export default class QuerySqlList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data : [],
            page : null,
            pageNum : 1,
            isLoading : false,
            modalOpen : false,
            viewOpen : false,
            clickText : "",
            modalClick : () => {},
            error : "",
            obj : {},
            testingCondition : [],
            testingData : [],
            dataSourceList : [{name : "请选择" , value : null}],
            testingInfo : ""
        };
        this.a = new Ajax();
        this.service = new QuerySqlService();
    };

    componentWillMount(){
        this.loadList();
        new DataSourceService().loadStartUpDataSource((list) => {
            this.setState({dataSourceList : list});
        } , this.state.dataSourceList);
    };

    loadList(pageNum){
        if(!pageNum){
            pageNum = 1;
        }
        this.a.get("/query-sql?pageNum=" + pageNum).then((resp) => {
            if(resp && resp.data.data){
                this.setState({
                    data : resp.data.data.list,
                    page : resp.data.data,
                    pageNum : pageNum,
                    modalOpen : false,
                    isLoading : false
                });
            }
        });
    };

    save(){
        this.setState({
            isLoading : true,
            error : null
        });
        let obj = this.state.obj;
        for(let k in this.refs){
            obj[k] = this.refs[k].value.trim();
        }

        let check = this.service.check(obj);
        if(!check.result){
            this.error(check.error);
            return;
        }

        this.a.post("/query-sql" , obj).then(() => {
            this.loadList();
        });
    };

    update(){
        this.setState({
            isLoading : true,
            error : null
        });
        let obj = this.state.obj;
        for(let k in this.refs){
            obj[k] = this.refs[k].value.trim();
        }

        let check = this.service.check(obj);
        if(!check.result){
            this.error(check.error);
            return;
        }

        this.a.put("/query-sql" , obj).then(() => {
            this.loadList(this.state.pageNum);
        });
    };

    delete(obj){
        confirmAlert({
            title : "提示",
            message : "确定删除查询语句 : "+ obj.name +"？",
            buttons : [{
                label : "确定",
                onClick : () => {
                    this.a.delete("/query-sql/" + obj.id).then((resp) => {
                        if(resp.data.status == 200){
                            this.loadList();
                        }else if(resp.data.status == 403){
                            confirmAlert({
                                title : "提示",
                                message : "无法删除该查询语句，其正在使用中！",
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

    view(obj){
        this.setState({
            viewOpen : true,
            obj : obj
        });
    };

    error(msg){
        this.setState({error : msg , isLoading : false});
    };

    openModal(obj , clickText , clickFun){
        this.setState({
            obj : obj,
            clickText : clickText,
            modalClick : clickFun,
            modalOpen : true
        });
    };

    tableColumns(obj){
        let array = [obj.name, obj.used, obj.columns,obj.tableName,obj.conditions,obj.dataSource ? obj.dataSource.name : ""];

        let items = array.map((o, i) => {
            return (
                <td key={i}>{o}</td>
            );
        });

        items.push((
            <td key="-1" className="center">
                <i className="fa fa-eye" onClick={this.view.bind(this , obj)}>预览</i>
                <i className="fa fa-edit" onClick={this.openModal.bind(this, obj , "修改" ,this.update.bind(this , obj))}>修改</i>
                <i className="fa fa-times" onClick={this.delete.bind(this, obj)}>删除</i>
            </td>
        ));

        return items;
    };

    modalBody(){
        return (
            <div>
                {this.service.modalBody(this.state.obj,this.state.dataSourceList,null)}
                <div className={"alert alert-danger " + (this.state.error ? "" : "hide")}>{this.state.error}</div>
            </div>
        );
    };

    viewBody(){
        return (
            <div>
                {this.service.testingModalBody(this , "obj" , (params) => {
                    this.a.post("/query-sql/execute/" + this.state.obj.id , params).then((resp) => {
                        if(resp && resp.data.data){
                            if(resp.data.data.length == 0){
                                this.setState({
                                    testingInfo : "未查询到任何数据"
                                });
                            }else{
                                this.setState({
                                    testingData : resp.data.data
                                });
                            }
                        }
                    });
                })}
            </div>
        );
    };

    closeViewBody(){
        this.setState({
            testingCondition : [],
            testingData : [],
            viewOpen : false
        });
    };

    render(){
        return (
            <section id="main-content" className="query-sql">
                {BaseComponent.pageHeader("动态配置","查询SQL管理")}
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
                                <Page data={this.state.page} click={this.loadList.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactLoading type="spokes" color="#1abc9c" className={"loading " + (this.state.isLoading ? "" : "hide")}/>
                <Modal isOpen={this.state.modalOpen}
                       title={this.state.clickText}
                       body={this.modalBody()}
                       click={this.state.modalClick}
                       close={() => this.setState({modalOpen : false , isLoading : false , error : "" , obj:{}})}
                       clickText={this.state.clickText}/>
                <Modal isOpen={this.state.viewOpen}
                       id="testing-modal"
                       close={this.closeViewBody.bind(this)}
                       clickText="关闭"
                       title="预览" body={<div>{this.viewBody()}</div>}/>
            </section>
        );
    };
};

QuerySqlList.defaultProps = {
    thead: ["名称", "调用方","查询列", "表名", "查询条件","数据源", "操作"]
};