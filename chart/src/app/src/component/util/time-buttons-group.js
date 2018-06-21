import "../../static/scss/main.scss";
import React from "react";
import PropTypes from "prop-types";

export default class TimeButtonsGroup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selected : props.selected,
            btn : props.buttons[0]
        };
    };

    handleClick(btn){
        this.setState({btn : btn});
        this.props.click.call(this,btn);
    };

    render(){
        return (
            <div className="actions pull-right">
                {this.props.buttons.map((btn , i) => {
                    return <a key={i}
                                   className={"btn btn-square btn-" + (this.state.btn.value == btn.value ? "primary" : "default")}
                                   onClick={this.handleClick.bind(this,btn)}>{btn.text}</a>;
                })}
            </div>
        );
    };
};

TimeButtonsGroup.propTypes = {
    click : PropTypes.func.isRequired
};

TimeButtonsGroup.defaultProps = {
    buttons : [
        {
            text : "今日",
            value : 1
        },{
            text : "近7日",
            value : 2
        },{
            text : "近30日",
            value : 3
        }
    ]
};