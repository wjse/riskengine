import React from "react";
import PropTypes from "prop-types";

export default class DashboardPanel extends React.Component{

    render(){
        return (
            <div className={"col-md-" + (this.props.width ? this.props.width : "*") + " " + (this.props.className ? this.props.className : "") }>
                <div className={"panel panel-" + (this.props.type ? this.props.type : "default")}>
                    <div className="panel-heading">
                        {this.props.title ? (<h3 className="panel-title">{this.props.title}</h3>) : ""}
                        {this.props.left ? this.props.left : ""}
                        {this.props.right ? this.props.right : ""}
                    </div>
                    <div className="panel-body">{this.props.body}</div>
                </div>
            </div>
        )
    };
};

DashboardPanel.propTypes = {
    body : PropTypes.node.isRequired
};