import React from "react";
import FormUtil from "../../util/form-util";
import Converter from "./service/dynamic-chart-converter";
import Modal from "../../util/modal";
import QuerySqlService from "./service/query-sql-service";

export default class ChartSeries extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chart : props.chart,
            sqlModalOpen : false,
            sqlNameKey : "",
            error : null,
            currentSql : {}
        };
        this.c = new Converter();
        this.q = new QuerySqlService();
    };

    handleChart(){
        this.props.handleChart(this.state.chart);
    };

    seriesForm(obj , i){
        obj.id = "series" + i;
        return (
            <div key={i} className="series">
                {
                    FormUtil.formGroup({label : "名称" , name : i + ".name"},
                        FormUtil.formInput({
                            inputWidth : 8,
                            name : i + ".name",
                            value : obj.name,
                            onChange : () => {
                                this.state.chart.series[i].name = this.refs[i + ".name"].value;
                                this.handleChart();
                            }
                        })
                    )
                }
                {
                    FormUtil.formGroup({label : "数据类型" , name : i + ".dataType"},
                        FormUtil.formSelect({
                            width : 8,
                            name : i + ".dataType",
                            value : obj.dataType,
                            options : this.c.dataTypes(),
                            onChange : this.changeDataType.bind(this, obj , i)
                        })
                    )
                }
                {
                    FormUtil.formGroup({label  : "值" , name : i + ".value"},
                        FormUtil.formInput({
                            inputWidth : 8,
                            name : i + ".value",
                            value : obj.value,
                            placeholder : obj.dataType == "custom" ? "多个值以“，”或“,”分隔。值只可为数值" : "",
                            onChange : () => {
                                this.state.chart.series[i].value = this.refs[i + ".value"].value;
                                this.handleChart();
                            },
                            onClick : this.openSqlModal.bind(this,obj , i)
                        })
                    )
                }
                <div className="button-group">
                    <a className={"btn btn-danger" + (i != 0 && i == this.state.chart.series.length - 1 ? "" : " hide")}
                       onClick={this.modSeriesCount.bind(this,"minus")}>删除</a>
                    <a className={"btn btn-primary" + (i == this.state.chart.series.length - 1 ? "" : " hide")}
                       onClick={this.modSeriesCount.bind(this,"plus")}>增加</a>
                </div>
            </div>
        );
    };

    changeDataType(obj , i){
        let chart = this.state.chart;
        chart.series[i].dataType = this.refs[i + ".dataType"].value;
        obj.value = "";
        delete obj.sql;
        this.setState({
            chart : chart,
            currentSql : {},
            error : null,
            sqlModalOpen : false
        });
        this.handleChart();
    };

    openSqlModal(obj , i){
        if(obj.dataType == "sql"){
            this.setState({
                sqlModalOpen : true,
                sqlNameKey : i + ".sql",
                currentSql : obj.sql ? obj.sql : {},
                error : null,
            });
        }
    };

    modSeriesCount(type){
        let chart = this.state.chart;
        if("minus" == type){
            if(chart.series.length != 1){
                chart.series.pop();
            }
        }else{
            chart.series.push({
                name : "",
                dataType : "custom",
                type : this.props.type,
                value : ""
            });
        }
        this.setState({chart : chart});
    };

    render(){
        return (
            <div className="chart-series">
                <div className="alert alert-warning" role="alert">
                    <h4>饼图数据项的值为单一值，如自定义则写入一个数字，SQL则只需查询一个字段的一行数据。</h4>
                    <h4>热点图数据项为双值（X轴、Y轴），如自定义则写入[x1,y1],[x2,y2]...，SQL则需要查询两个字段来映射。</h4>
                </div>
                {this.state.chart.series.map((obj , i) => {
                    return this.seriesForm(obj , i)
                })}
                <Modal isOpen={this.state.sqlModalOpen} title="SQL配置"
                       click={this.modalSqlClick.bind(this)}
                       body={this.modalBody()}/>
            </div>
        );
    };

    modalBody(){
        return (
            <div>
                {this.q.modalBody(this.state.currentSql,this.props.dataSourceList,this.state.sqlNameKey)}
                <div className={"alert alert-danger " + (this.state.error ? "" : "hide")}>{this.state.error}</div>
            </div>
        );
    };

    modalSqlClick(){
        let sqlRefs = [];
        for(let k in this.refs){
            if(k.indexOf(".sql.") > -1){
                sqlRefs.push(k);
            }
        }


        let index , sql = this.state.currentSql , chart = this.state.chart;
        for(let i in sqlRefs){
            let arr = sqlRefs[i].split(".");
            index = parseInt(arr[0]);
            sql[arr[2]] = this.refs[sqlRefs[i]].value;
        }

        sql.module = chart.series[index].id;

        let check = this.q.check(sql);
        if (!check.result) {
            this.setState({error: check.error});
            return;
        }

        chart.series[index].sql = sql;
        // chart.series[index].value = this.q.buildSql(sql);
        chart.series[index].value = sql.name;
        this.setState({
            chart : chart,
            sqlModalOpen : false
        });
        this.handleChart();
    };
};