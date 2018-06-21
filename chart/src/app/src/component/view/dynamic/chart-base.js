import React from "react";
import FormUtil from "../../util/form-util";
import Converter from "./service/dynamic-chart-converter";

export default class ChartBase extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            chart : props.chart
        };
    };

    handleChart(){
        this.props.handleChart(this.state.chart);
    };

    render(){
        return (
            <div className="clearfix chart-base">
                {
                    FormUtil.formGroup({label : "状态" , name : "status"},
                        FormUtil.formSelect({
                            width : 8,
                            name : "status",
                            value: this.state.chart.status,
                            options : new Converter().statusArray(),
                            onChange : () => {
                                this.state.chart.status = this.refs.status.value;
                                this.handleChart();
                            }
                        })
                    )
                }
                {
                    FormUtil.formGroup({label : "报表名称" , name : "title"},
                        FormUtil.formInput({
                            inputWidth : 8,
                            name: "title",
                            value: this.state.chart.text,
                            onChange:() => {
                                this.state.chart.text = this.refs.title.value;
                                this.handleChart();
                            }
                        })
                    )
                }
            </div>
        );
    };
};