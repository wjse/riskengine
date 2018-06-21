import "../../../static/scss/list.scss";
import React from "react";
import Modal from "../../util/modal";

import Converter from "./converter/rule-converter";
import Ajax from "../../service/ajax";
import ReactLoading from "react-loading";
import FormUtil from "../../util/form-util";
import BaseComponent from "../../service/base-component";
import RuleTypeJson from "../../../data/rule-type.json";
import Page from "../../util/page";

export default class RuleListView extends React.Component {

    constructor(props) {
        super(props);
        this.c = new Converter();
        this.a = new Ajax();
        this.state = {
            data: [],
            page: null,
            modalOpen: false,
            isLoading: false,
            error : null,
            obj: {}
        };
        this.updateRule = this.updateRule.bind(this);
    };

    componentWillMount() {
        this.setState({isLoading: true});
        this.loadData();
    };

    loadData(pageNum){
        if(!pageNum){
            pageNum = 1;
        }
        this.a.get("/rule?pageNum=" + pageNum).then((resp) => {
            if (resp && resp.data && resp.data.status == 200) {
                this.setState({
                    page: resp.data.data,
                    data : resp.data.data.list,
                    isLoading: false
                });
            }
        });
    };

    tableBody() {
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

    tableColumns(obj) {
        let array = [obj.name, this.c.type(obj.type), obj.value, this.c.status(obj.status),
                    obj.message, this.c.time(obj.time, obj), obj.description];

        let items = array.map((o, i) => {
            return (
                <td key={i}>{o}</td>
            );
        });

        items.push((
            <td key="-1" className="center">
                <i className="fa fa-edit" onClick={this.openModal.bind(this, obj)}>修改</i>
            </td>
        ));

        return items;
    };

    openModal(obj) {
        this.setState({
            modalOpen: true,
            obj: obj
        });
    };

    updateRule() {
        debugger;
        this.setState({isLoading: true});
        let refs = this.refs , rule = this.state.obj;

        for (let k in refs) {
            rule[refs[k].name] = refs[k].value.trim();
        }

        if (rule.timeValue != 0 || rule.timeValue != "") {
            rule.time = rule.timeType + "_" + rule.timeValue;
        }else{
            rule.time = null;
        }

        this.a.put("/rule", rule).then(() => {
            this.setState({
                isLoading: false,
                modalOpen:false
            });
        });
    };

    modalBody() {
        return (
            <form className="form-horizontal">
                {
                    FormUtil.formGroup({name : "name" , label : "规则名称"} , FormUtil.formInput({
                            name : "name" ,
                            value : this.state.obj.name,
                            disabled : "disabled"
                        })
                    )
                }
                {
                    FormUtil.formGroup({name : "type" , label : "规则类型"}, FormUtil.formSelect({
                            name : "type" ,
                            value : this.state.obj.type ,
                            options : this.props.typeArray(),
                            disabled : "disabled"
                        })
                    )
                }
                {
                    FormUtil.formGroup({name : "value" , label : "规则值"} , FormUtil.formInput({
                            name : "value",
                            value : this.state.obj.value,
                            type : "tel",
                            placeholder : "0~99的正整数",
                            onChange : FormUtil.numberCheck,
                            maxLength : 2
                        })
                    )
                }
                {
                    FormUtil.formGroup({name : "status" , label : "状态"} , FormUtil.formSelect({
                            name : "status" ,
                            value : this.state.obj.status ,
                            options : this.c.statusArray()
                        })
                    )
                }
                {
                    FormUtil.formGroup({name : "message" , label : "通知消息"} , FormUtil.formTextArea({
                            name : "message" ,
                            value : this.state.obj.message,
                            maxLength : 100
                        })
                    )
                }
                {
                    FormUtil.formGroup({name : "timeType" , label : "时间范围"} , FormUtil.formSelect({
                            name : "timeType" ,
                            value : this.state.obj.timeType ? this.state.obj.timeType : "minute" ,
                            options : this.props.timeArray,
                            width : 4
                        }), FormUtil.minus() , this.timeValueGroup())
                }
                {
                    FormUtil.formGroup({name : "description" , label : "描述"} , FormUtil.formTextArea({
                            name : "description" ,
                            value : this.state.obj.description,
                            maxLength : 100
                        })
                    )
                }
                <div className={"alert alert-danger " + (this.state.error ? "" : "hide")}>{this.state.error}</div>
            </form>
        );
    };

    timeValueGroup(){
        return (
            <div key={Math.random()} className="col-sm-5">
                {FormUtil.input({
                    name : "timeValue",
                    value : this.state.obj.timeValue,
                    type : "tel",
                    placeholder : "0~99的正整数",
                    onChange : FormUtil.numberCheck,
                    maxLength : 2
                })}
            </div>
        );
    };

    render() {
        return (
            <section id="main-content">
                {BaseComponent.pageHeader(null , "规则管理")}
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading"></div>
                            <div className="panel-body">
                                {this.tableBody()}
                                <Page data={this.state.page} click={this.loadData.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactLoading type="spokes" color="#1abc9c" className={"loading " + (this.state.isLoading ? "" : "hide")}/>
                <Modal isOpen={this.state.modalOpen}
                       title="修改"
                       body={<div>{this.modalBody()}</div>}
                       click={this.updateRule}
                       close={() => this.setState({modalOpen : false , isLoading : false})}
                       clickText="修改"/>
            </section>
        );
    };
};

RuleListView.defaultProps = {
    thead: ["规则名称", "规则类型", "规则值", "状态", "通知消息", "时间范围", "描述", "操作"],
    typeArray : () => {
        let array = [];
        for (let k in RuleTypeJson) {
            array.push({
                name : RuleTypeJson[k],
                value : k
            });
        }

        return array;
    },
    timeArray : [{
                    name : "天" , value : "day"
                },{
                    name : "分钟" , value : "minute"
                }]
};

