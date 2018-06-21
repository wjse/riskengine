import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import Echarts from "echarts/lib/echarts";
import Ajax from "../../service/ajax";
import React from "react";

export default class UserChart extends React.Component{
    componentWillMount(){
        new Ajax().get("/dashboard/user").then((resp) => {
            if(resp && resp.status == 200 && resp.data.currentWeek){
                let currentWeek = resp.data.currentWeek , lastWeek = resp.data.lastWeek;
                let time = currentWeek.startTime + " - " + currentWeek.endTime;

                let currentWeekData = [currentWeek.sundayCount,currentWeek.mondayCount,
                    currentWeek.tuesdayCount,currentWeek.wensdayCount,
                    currentWeek.thursdayCount,currentWeek.fridayCount,
                    currentWeek.saturdayCount];
                let lastWeekData = [];
                if(lastWeek){
                    lastWeekData = [lastWeek.sundayCount,lastWeek.mondayCount,
                        lastWeek.tuesdayCount,lastWeek.wensdayCount,
                        lastWeek.thursdayCount,lastWeek.fridayCount,
                        lastWeek.saturdayCount];
                }

                this.chart(currentWeekData , lastWeekData , time);
            }else{
                this.chart([] , [] ,"");
            }
        });
    };

    chart(currentWeekData , lastWeekData, time){
        let chart = Echarts.init(document.getElementById("bar"));
        chart.setOption({
            title: {
                text: time,
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    label: {
                        backgroundColor: "#283b56"
                    }
                }
            },
            xAxis: {
                data: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
            },
            yAxis: {name : "访问量"},
            series: [{
                color:"#498cab",
                name: "本周访问量",
                type: "bar",
                data: currentWeekData
            },{
                name : "上周访问量",
                type : "line",
                data : lastWeekData
            }]
        });
    };

    render(){
        return <div id="bar" style = {{height : this.props.height ? this.props.height : "300px"}}></div>
    };
}