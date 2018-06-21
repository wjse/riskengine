import React from "react";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/chart/funnel";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/grid";
import "echarts/lib/component/axis";

import Ajax from "../../service/ajax";

export default class AppChart extends React.Component{

    componentWillMount(){
        new Ajax().get("/dashboard/app").then((resp) => {
            if(resp && resp.status == 200 && resp.data.list){
                let array = resp.data.list;
                let data = [] , nameData = [];

                for(let i in array){
                    nameData.push(array[i].appName);
                    data.push(array[i].count);
                }

                let time = resp.data.startTime + " - " + resp.data.endTime;
                this.chart(nameData , data , time);
            }
        });
    };

    chart(nameData , data , time){
        let chart = Echarts.init(document.getElementById("funnel"));
        chart.setOption({
            title : {
                text : time
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: nameData
            },
            series: [{
                name:"访问量",
                data: data,
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new Echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#14c8d4'},
                                {offset: 1, color: '#43eec6'}
                            ]
                        )
                    }
                }
            }]
        });
    };

    render(){
        return (<div id="funnel" style={{height : this.props.height ? this.props.height : "300px"}}></div>);
    };
};