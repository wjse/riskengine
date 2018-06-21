import "../../../static/scss/chart.scss";
import React from "react";
import DataSourceService from "./service/data-source-service";
import Panel from "../dashboard/panel";
import DynamicImgsReader from "../../util/dynamic-imgs-reader";
import Converter from "./service/dynamic-chart-converter";
import ChartBase from "./chart-base";
import ChartAxis from "./chart-axis";
import ChartSeries from "./chart-series";
import {confirmAlert} from "react-confirm-alert";
import Ajax from "../../service/ajax";

export default class ChartMod extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            dataSourceList:[],
            chart : props.chart ? props.chart : {
                type : "",
                status : "",
                text : "",
                xAxis : this.defaultAxis("xAxis" , "X轴" , "category"),
                yAxis : this.defaultAxis("yAxis" , "Y轴" , "value"),
                series:[{
                    name : "",
                    dataType : "custom",
                    value : ""
                }]
            },
            type : null,
            typeImages : null
        };
        this.c = new Converter();
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


    componentWillMount(){
        new DataSourceService().loadStartUpDataSource((list) => {
            this.setState({dataSourceList : list});
        } , this.state.dataSourceList);

        this.state.typeImages = new DynamicImgsReader().getImgs()
    };

    chartType(){
        return (
            <div className="clearfix">
                <ul className="type-imgs clearfix">
                    <li>
                        <label>报表类型</label>
                    </li>
                    {this.state.typeImages.map((obj , i) => {
                        return (
                            <li key={i}>
                                <img src={obj.img}
                                     className={"img-thumbnail" + (this.state.chart.type == obj.type ? " active" : "")}
                                     onClick={() => {
                                         let chart = this.state.chart;
                                         chart.type = obj.type;
                                         if(!chart.text){
                                             chart.text = this.c.type(obj.type);
                                         }
                                         if(chart.series.length > 0){
                                             chart.series.forEach((s) => {
                                                 s.type = obj.type
                                             });
                                         }
                                         this.setState({
                                             chart : chart
                                         });
                                     }
                                 }/>
                            </li>
                        );
                    })}
                    <li>
                        <label>{this.c.type(this.state.chart.type)}</label>
                    </li>
                </ul>
            </div>
        );
    };

    handleChart(chart){
        this.state.chart = chart;
    };

    check(){
        let chart = this.state.chart;

        if(!chart.type){
            return {result : false , error : "未选择报表类型"};
        }

        if(chart.type != "pie"){
            if(!this.checkAxis(chart.xAxis)){
                return {result : false , error : "X数据轴配置错误"};
            }

            if(!this.checkAxis(chart.yAxis)){
                return {result : false , error : "Y数据轴配置错误"};
            }
        }

        if(!this.checkSeries(chart.series)){
            return {result : false , error : "数据项配置错误"};
        }

        return {result : true};
    };

    checkAxis(axis){
        if(this.state.chart.type == "scatter"){
            return true;
        }

        if(!axis){
            return false;
        }

        if("category" == axis.type){
            let value = axis.value.trim();
            if(!value){
                return false
            }

            // value = value.trim();
            // if(axis.dataType == "custom" && value.indexOf(",") == -1 && value.indexOf("，") == -1){
            //     return false;
            // }
        }

        return true
    }

    checkSeries(series){
        if(!series){
            return false;
        }

        let chartType = this.state.chart.type;
        let isCheck = false;

        for(let i in series){
            let dataType = series[i].dataType ,
                value = series[i].value;

            if(dataType == "sql" && !value){
                return false;
            }else{
                if("scatter" == chartType && dataType == "custom"){
                    let re = /\[(.*?)\]/g,arr = [],tmp = "";

                    while(tmp = re.exec(value)){
                        arr.push(tmp[1]);
                    }

                    if(0 == arr.length){
                        return false;
                    }

                    for(let j in arr){
                        let dataArr = [];
                        let str = arr[j];

                        if(str.indexOf(",") > -1){
                            dataArr = str.split(",");
                        }else if(str.indexOf("，") > -1){
                            dataArr = str.split("，");
                        }else{
                            return false;
                        }

                        if(2 != dataArr.length){
                            return false
                        }
                    }
                }else{
                    isCheck = !value.trim() == false;
                }
            }
        }
        return isCheck;
    };

    save(){
        let check = this.check();
        if(!check.result){
            this.alert(check.error);
            return;
        }

        let chart = this.state.chart;
        if(chart.type == "pie" || chart.type == "scatter"){
            chart.xAxis = this.defaultAxis("xAxis" , "X轴" , "category");
            chart.yAxis = this.defaultAxis("yAxis" , "Y轴" , "value");
        }

        new Ajax().post("/dynamic/chart" , chart).then((resp) => {
            if(resp && resp.data.status == 200){
                this.props.goBack();
            }else if(resp.data.error == "Scatter must with two value fields."){
                this.alert("热点图每一数据项必须包含两个值或查询两个字段值");
            }else{
                this.alert("服务器异常!");
            }
        });
    };

    alert(msg){
        confirmAlert({
            title : "错误！",
            message : msg,
            buttons : [{
                label: "确定"
            }]
        });
    };

    render(){
        return (
            <section id="main-content" className="chart">
                <Panel title="报表类型" body={this.chartType()} right={<a className="btn btn-primary"
                                                                         id="goBack"
                                                                         onClick={this.props.goBack}>返回</a>}/>
                <Panel title="基础配置" body={
                    <ChartBase chart={this.state.chart} handleChart={this.handleChart.bind(this)}/>
                }/>
                <ChartAxis chart={this.state.chart}
                           dataSourceList={this.state.dataSourceList}
                           handleChart={this.handleChart.bind(this)}/>
                <Panel title="数据项配置" body={
                    <ChartSeries chart={this.state.chart}
                                 dataSourceList={this.state.dataSourceList}
                                 handleChart={this.handleChart.bind(this)}/>
                }/>
                <div className="well">
                    <div className="button-group btn-group-lg">
                        <a className="btn btn-primary" onClick={this.save.bind(this)}>保存</a>
                    </div>
                </div>
            </section>
        );
    };
};