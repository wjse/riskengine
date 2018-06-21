import React from "react";
import Converter from "./service/dynamic-chart-converter";
import FormUtil from "../../util/form-util";
import Modal from "../../util/modal";
import QuerySqlService from "./service/query-sql-service";
import Panel from "../dashboard/panel";

export default class ChartAxis extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chart : props.chart,
            sqlModalOpen : false,
            currentSql : {},
            sqlNameKey : "",
            error : null
        }
        this.c = new Converter();
        this.q = new QuerySqlService();
    };

    handleChart(){
        this.props.handleChart(this.state.chart);
    };

    defaultAxis(id , name , type){
        let obj = {
            id : id ,
            name : name ,
            type : type
        };

        if("category" == type){
            obj.dataType = "custom";
            obj.value = "";
        }
        return obj;
    };

    form(obj , i){
        return (<div className="chart-axis" key={Math.random()}>
            {
                FormUtil.formGroup({label : "名称" , name : obj.id + ".name"} ,
                    FormUtil.formInput({
                        inputWidth : 8,
                        name : obj.id + ".name",
                        value : obj.name,
                        disabled : this.isPieOrScatter(),
                        onChange : () => {
                            this.state.chart[obj.id].name = this.refs[obj.id + ".name"].value;
                            this.handleChart();
                        }
                    })
                )
            }
            {
                FormUtil.formGroup({label : "类型" , name : obj.id + ".type"} ,
                    FormUtil.formSelect({
                        width : 8,
                        name : obj.id + ".type",
                        value : obj.type,
                        disabled : this.isPieOrScatter(),
                        options : this.props.axisTypes,
                        onChange : () => {
                            if(obj.id == this.state.chart.xAxis.id){
                                this.changeType(obj , "yAxis");
                            }else{
                                this.changeType(obj , "xAxis");
                            }
                            this.handleChart();
                        }
                    })
                )
            }
            {this.dataForm(obj , i)}
        </div>);
    };

    changeType(obj , another){
        let type = this.refs[obj.id + ".type"].value,
            chart = this.state.chart,
            anotherType = type == "value" ? "category" : "value";

        obj = this.defaultAxis(obj.id , obj.name , type);
        chart[obj.id] = obj;
        chart[another] = this.defaultAxis(chart[another].id , chart[another].name , anotherType);

        if(type == "value"){
            delete obj.sql;
        }

        if(anotherType == "value"){
            delete chart[another].sql;
        }

        this.setState({
            chart : chart,
            currentSql : {}
        });
    };

    dataForm(obj , i){
        if(obj.type == "value"){
            return;
        }

        return (
            <div key={Math.random()}>
                {
                    FormUtil.formGroup({label : "数据类型" , name : obj.id + ".dataType"},
                        FormUtil.formSelect({
                            width : 8,
                            name : obj.id + ".dataType",
                            disabled : this.isPieOrScatter(),
                            value : obj.dataType,
                            options : this.c.dataTypes(),
                            onChange : this.changeDataType.bind(this , obj)
                        })
                    )
                }
                {
                    FormUtil.formGroup({label  : "值" , name : obj.id + ".value"},
                        FormUtil.formInput({
                            inputWidth : 8,
                            name : obj.id + ".value",
                            value : obj.value,
                            disabled : this.isPieOrScatter(),
                            placeholder : obj.dataType == "custom" ? "多个值以“，”或“,”分隔" : "",
                            onChange : () => {
                                this.state.chart[obj.id].value = this.refs[obj.id + ".value"].value;
                                this.handleChart();
                            },
                            onClick : this.openSqlModal.bind(this,obj)
                        })
                    )
                }
                <div className={"alert alert-warning" + (i == 0 ? "" : " hide")} role="alert">
                    <h4>饼图和热点图可不配置数据轴</h4>
                </div>
            </div>
        );
    };

    isPieOrScatter(){
        return this.state.chart.type == "pie" || this.state.chart.type == "scatter";
    };

    changeDataType(obj){
        let chart = this.state.chart;
        chart[obj.id].dataType = this.refs[obj.id + ".dataType"].value;
        delete obj.sql;
        obj.value = "";
        this.setState({
            chart : chart,
            currentSql : {},
            error : null,
            sqlModalOpen : false
        });
        this.handleChart();
    };

    openSqlModal(obj){
        if(obj.dataType == "sql"){
            this.setState({
                sqlModalOpen : true,
                sqlNameKey : obj.id + ".sql",
                currentSql : obj.sql ? obj.sql : {},
                error : null
            });
        }
    };

    render(){
        return (
            <div className="clearfix row">
                <Panel title="X轴配置" width="6" body={this.form(this.state.chart.xAxis , 0)}/>
                <Panel title="Y轴配置" width="6" body={this.form(this.state.chart.yAxis , 1)}/>
                <Modal isOpen={this.state.sqlModalOpen} title="SQL配置"
                       click={this.modalSqlClick.bind(this)}
                       body={this.modalBody()}/>
            </div>
        );
    };

    modalSqlClick() {
        let sqlRefs = [];
        for (let k in this.refs) {
            if (k.indexOf(".sql.") > -1) {
                sqlRefs.push(k);
            }
        }

        this.setState({
            error: null
        });

        let sql = this.state.currentSql;
        for (let i in sqlRefs) {
            let arr = sqlRefs[i].split(".");
            sql.module = arr[0];
            sql[arr[2]] = this.refs[sqlRefs[i]].value.trim();
        }

        let check = this.q.check(sql);
        if (!check.result) {
            this.setState({error: check.error});
            return;
        }

        let chart = this.state.chart;
        // chart[sql.module].value = this.q.buildSql(sql);
        chart[sql.module].value = sql.name;
        chart[sql.module].sql = sql;
        this.setState({
            chart : chart,
            sqlModalOpen : false
        });
        this.handleChart();
    };

    modalBody(){
        return (
            <div>
                {this.q.modalBody(this.state.currentSql,this.props.dataSourceList,this.state.sqlNameKey)}
                <div className={"alert alert-danger " + (this.state.error ? "" : "hide")}>{this.state.error}</div>
            </div>
        );
    };
};

ChartAxis.defaultProps = {
    axisTypes : [{
        name : "分类轴",
        value : "category"
    },{
        name : "数值轴",
        value : "value"
    }]
};