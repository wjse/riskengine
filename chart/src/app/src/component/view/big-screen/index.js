import "../../../static/scss/big.scss";
import "../../../static/css/gradient.css";
import "bootstrap";
import "font-awesome-webpack";
import React from "react";
import ReactDom from "react-dom";
import Ajax from "../../service/ajax";
import PubSub from "pubsub-js";
import ScreenMap from "./view/screen-map";
import Panel from "../dashboard/panel";
import BigChart1 from "../chart/big-chart-1";
import BigChart2 from "../chart/big-chart-2";
import BigChart3 from "../chart/big-chart-3";
import BigChart4 from "../chart/big-chart-4";
import BigChart5 from "../chart/big-chart-5";
import BigChart6 from "../chart/big-chart-6";
import BigChart8 from "../chart/big-chart-8";
import BigChart7 from "../chart/big-chart-7";

class App extends React.Component{

    constructor(props){
        super(props);
        // this.state = {height : window.screen.availHeight};
    };

    componentWillMount(){

        this.pubToken = PubSub.subscribe("isLogin" , (topic , isLogin) => {
            if(!isLogin){
                window.location.href = "/index.html";
            }
        });

        let token = this.props.token;
        if(!token){
            window.location.href = "/index.html";
        }else{
            new Ajax().get("/login",{token : token}).then((resp) => {
                if(!resp.data){
                    window.location.href = "/index.html";
                }
            });
        }
    };

    componentWillUnmount(){
        PubSub.unsubscribe(this.pubToken);
    };

    header(){
      return (
          <div className="row text-center header">
              <div className="col-lg-*">
                  <div className="col-sm-1 pull-right" id="close">
                      <a href="/index.html">
                          <i className="fa fa-power-off"></i>
                      </a>
                  </div>
              </div>
          </div>
      );
    };

    firstRow(){
        return (
            <div className="row" id="firstRow">
                <Panel title="用户访问汇总" width="3" body={this.leftChart()}/>
                <ScreenMap/>
                <Panel width="3" title="风险汇总" body={this.rightChart()}/>
            </div>
        );
    };

    leftChart(){
        return (
            <div>
                <BigChart1/>
                <BigChart2/>
            </div>
        );
    };

    rightChart(){
        return (
            <div>
                <BigChart3/>
                <BigChart4/>
            </div>
        );
    };

    secondRow(){
        return (
            <div className="row" id="secondRow">
                <div className="col-xs-3 col-md-3 block">
                    <Panel width="12" body={<BigChart5/>}/>
                </div>
                <div className="col-xs-3 col-md-3 block">
                    <Panel width="12" body={<BigChart6/>}/>
                </div>
                <div className="col-xs-3 col-md-3 block">
                    <Panel width="12" body={<BigChart7/>}/>
                </div>
                <div className="col-xs-3 col-md-3 block">
                    <Panel width="12" body={<BigChart8/>}/>
                </div>
            </div>
        );
    };

    render(){
        return (
            <div id="big">
                {this.header()}
                {this.firstRow()}
                {this.secondRow()}
            </div>
        );
    };
};

ReactDom.render(<App token={window.sessionStorage.getItem("token")}/> , document.getElementById("app"));