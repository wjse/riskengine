import 'react-datepicker/dist/react-datepicker.css';
import "../../static/scss/date.scss";
import React from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";


export default class DatePickerGroup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            startDate:null,
            endDate : null
        };
    };

    setStartDate(date){
        let endDate = this.state.endDate;
        if(endDate && endDate._d < date._d){
            this.setState({startDate : endDate});
        }else{
            this.setState({startDate : date});
        }
    };

    setEndDate(date){
        let startDate = this.state.startDate;
        if(startDate && startDate._d > date._d){
            this.setState({endDate : startDate});
        }else{
            this.setState({endDate : date});
        }
    };

    handleClick(){
        this.props.click.call(this,this.state.startDate , this.state.endDate);
    };

    render(){
        return (
            <div className="date-picker">
                <form className="form-inline">
                    <div className="form-group">
                        <DatePicker className="form-control"
                                    locale="zh-cn"
                                    placeholderText="开始时间"
                                    selectsStart
                                    selected={this.state.startDate}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onChange={this.setStartDate.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <i className="fa  fa-long-arrow-right"></i>
                    </div>
                    <div className="form-group">
                        <DatePicker className="form-control"
                                    locale="zh-cn"
                                    placeholderText="结束时间"
                                    selectsEnd
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    selected={this.state.endDate}
                                    onChange={this.setEndDate.bind(this)}/>
                    </div>
                    <a className="btn btn-default" onClick={this.handleClick.bind(this)}>
                        <i className="fa fa-search"/>
                    </a>
                </form>
            </div>
        );
    };
};

DatePickerGroup.propTypes = {
    click : PropTypes.func.isRequired
};