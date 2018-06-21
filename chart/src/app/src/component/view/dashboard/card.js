import "../../../static/scss/index-main.scss";
import React from "react";
import PropTypes from "prop-types";

export default class DashboardCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            color : props.card.color,
            icon : props.card.icon,
            name : props.card.name,
            count : props.card.count
        };
    };

    componentWillMount(){
        let count = this.state.count,
            tmp = 0;

        this.interval = setInterval(() => {
            if(count != 0 && "-" != count){
                tmp++;

                this.setState({
                    count : tmp
                });
            }
            if(count == 0 || tmp == count || "-" == count){
                clearInterval(this.interval);
            }
        },1);
    };

    componentWillUnmount(){
        clearInterval(this.interval);
    };

    render(){
        return (
            <div className="col-md-3 col-sm-6">
                <div className={"dashboard-title detail title-" + this.state.color}>
                    <div className="content">
                        <h1 className="text-left">{this.state.count}</h1>
                        <p>{this.state.name}</p>
                    </div>
                    <div className="icon">
                        <i className={"fa fa-" + this.state.icon}></i>
                    </div>
                </div>
            </div>
        );
    };
};

DashboardCard.propTypes = {
    card : PropTypes.object.isRequired
};