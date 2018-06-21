import "../../../static/scss/list.scss";
import React from "react";
import ReactLoading from "react-loading";
import BaseComponent from "../../service/base-component";
import Converter from "./service/dynamic-chart-converter";
import Ajax from "../../service/ajax";
import ChartMod from "./chart-mod";
import {confirmAlert} from "react-confirm-alert";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Page from "../../util/page";

export default class ChartList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: null,
            page  : null,
            isLoading: false,
            isMod: false,
            obj: null
        };
        this.a = new Ajax();
        this.c = new Converter();
    };

    componentWillMount(){
        this.loadData();
    };

    loadData(pageNum){
        if(!pageNum){
            pageNum = 1;
        }
        this.a.get("/dynamic/chart?pageNum=" + pageNum).then((resp) => {
            if(resp && resp.data.status == 200 && resp.data.data.list){
                console.log(resp.data.data.list);
                resp.data.data.list.forEach((obj) => {
                    obj.xAxis = JSON.parse(obj.xAxis);
                    obj.yAxis = JSON.parse(obj.yAxis);
                    obj.series = JSON.parse(obj.series);
                });
                this.setState({
                    data : resp.data.data.list,
                    page : resp.data.data
                });
            }
        });
    };

    list(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <a className="btn btn-square btn-primary pull-right" onClick={this.toMod.bind(this , null)}>
                        新增
                        <i className="fa fa-plus"></i>
                    </a>
                </div>
                <div className="panel-body">
                    {BaseComponent.tableBody(this.props.thead,this.state.data,this.tableColumns.bind(this))}
                    <Page data={this.state.page} click={this.loadData.bind(this)}/>
                </div>
            </div>
        );
    };

    goBack(){
        this.setState({
            isMod : false,
            obj : {}
        });

        this.loadData();
    };

    toMod(obj){
        this.setState({
            isMod : true,
            obj : obj
        });
    };

    toPreview(obj){
        window.open(obj.htmlUrl , "预览" , "channelmode=yes");
    };

    delete(obj){
        confirmAlert({
            title : "提示！",
            message : "确定删除" + obj.text + "?",
            buttons : [{
                label: "确定",
                onClick : () => {
                    this.a.delete("/dynamic/chart/" + obj.id).then(() => {
                        this.loadData();
                    });
                }
            },{
                label : "取消"
            }]
        });
    };

    tableColumns(obj){
        let array = [obj.text , this.c.status(obj.status) , this.c.type(obj.type) ,
                     obj.htmlUrl , this.c.date(obj.createTime) ,obj.creator];
        let items = array.map((o , i) => {
            return (
                <td width={(o && o.length > 10 ? o.length / 2 + "%" : "5%")} key={i}>
                    {o}
                    {i == 3 ? this.copy(o) : ""}
                </td>
            )
        });

        items.push((
            <td width="5%" key="-1" className="center">
                <i className="fa fa-eye" onClick={this.toPreview.bind(this , obj)}>预览</i>
                <i className="fa fa-edit" onClick={this.toMod.bind(this , obj)}>修改</i>
                <i className="fa fa-times" onClick={this.delete.bind(this, obj)}>删除</i>
            </td>
        ));

        return items;
    };

    copy(url){
        return (
            <CopyToClipboard text={url} onCopy={() => {alert("已成功复制至剪贴板")}}>
                <a className="btn btn-default">复制</a>
            </CopyToClipboard>
        );
    };

    render(){
        return (
            <section id="main-content">
                {BaseComponent.pageHeader("动态配置" , "动态报表")}
                <div className="row">
                    <div className="col-md-12">
                        {this.state.isMod ? <ChartMod goBack={this.goBack.bind(this)} chart={this.state.obj}/>
                                          : this.list()}
                    </div>
                </div>
                <ReactLoading type="spokes" color="#1abc9c" className={"loading " + (this.state.isLoading ? "" : "hide")}/>
            </section>
        );
    };
};

ChartList.defaultProps = {
    thead: ["名称", "状态", "类型" , "链接" , "创建时间", "创建人" , "操作"]
};