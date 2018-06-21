import FormUtil from "../../../util/form-util";
import React from "react";

export default class QuerySqlService{

    check(obj){
        let r = {
            result : true
        };
        if(!obj.name){
            r.error = "名称不能为空!";
            r.result = false;
            return r;
        }

        if(!obj.columns){
            r.error = "查询列不能为空!";
            r.result = false;
            return r;
        }

        if(!obj.tableName){
            r.error = "表名不能为空!";
            r.result = false;
            return r;
        }

        if(!obj.dataSourceId || "请选择" == obj.dataSourceId){
            r.error = "请选择数据源!";
            r.result = false;
            return r;
        }

        return r;
    };

    name(name , key){
        if(key){
            return key.concat(".", name);
        }

        return name;
    };

    modalBody(obj , dataSourceList , nameKey){
        return (
            <form className="form-horizontal">
                {
                    FormUtil.formGroup({name : this.name("name" , nameKey) , label : "名称" , isRequired : true}, FormUtil.formInput({
                        name : this.name("name" , nameKey),
                        maxLength : 50,
                        value : obj.name
                    }))
                }
                {
                    FormUtil.formGroup({name : this.name("columns" , nameKey) , label : "查询列" , isRequired : true}　, FormUtil.formInput({
                        name : this.name("columns" , nameKey),
                        value : obj.columns,
                        maxLength : 200,
                        placeholder : "例如：\"*\"或\"t_column1,t_column2\""
                    }))
                }
                {
                    FormUtil.formGroup({name : this.name("tableName" , nameKey) , label : "表名" , isRequired : true}, FormUtil.formInput({
                        name : this.name("tableName" , nameKey),
                        maxLength : 100,
                        value : obj.tableName,
                        placeholder : "例如\"t_table\"或\"t_table1,t_table2\""
                    }))
                }
                {
                    FormUtil.formGroup({name : this.name("conditions" , nameKey) , label : "查询条件"} , FormUtil.formInput({
                        name : this.name("conditions" , nameKey),
                        maxLength : 200,
                        value : obj.conditions,
                        placeholder: "例如\"t_name=:name and t_age>:age\" , :name为绑定变量"
                    }))
                }
                {
                    FormUtil.formGroup({name : this.name("groupBy" , nameKey) , label : "分组"} , FormUtil.formInput({
                        name : this.name("groupBy" , nameKey),
                        maxLength : 200,
                        value : obj.groupBy
                    }))
                }
                {
                    FormUtil.formGroup({name : this.name("having" , nameKey) , label : "分组条件"} , FormUtil.formInput({
                        name : this.name("having" , nameKey),
                        maxLength : 200,
                        value : obj.having,
                        placeholder: "例如\"t_name=:name and t_age>:age\" , :name为绑定变量"
                    }))
                }
                {
                    FormUtil.formGroup({name : this.name("orderBy" , nameKey) , label : "排序"} , FormUtil.formInput({
                        name : this.name("orderBy" , nameKey),
                        value : obj.orderBy
                    }))
                }
                {
                    FormUtil.formGroup({name : this.name("dataSourceId" , nameKey) , label : "数据源" , isRequired : true} , FormUtil.formSelect({
                        name : this.name("dataSourceId" , nameKey),
                        value : obj.dataSourceId,
                        options : dataSourceList
                    }))
                }
            </form>
        );
    };

    testingModalBody(component , stateKey , callback){
        return (
            <form id="testing-form">
                <pre>
                    {component.state[stateKey].sqlString}
                    <div className="btn-group" id="testing-btn">
                        <a onClick={this.testingCondition.bind(this , "minus" , component)} className="btn btn-default">
                            <i className="fa fa-minus"></i>
                        </a>
                        <a onClick={this.testingCondition.bind(this , "plus" , component)} className="btn btn-default">
                            <i className="fa fa-plus"></i>
                        </a>
                        <a onClick={this.testing.bind(this , component , callback)} className="btn btn-success">测试</a>
                    </div>
                </pre>
                {component.state.testingCondition.map((o , i) => {
                    return (<div key={i} className="form-inline">
                        <div className="form-group">
                            <label htmlFor={"k-" + i}>Key:</label>
                            <input id={"k-" + i} ref={"k-" + i} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor={"v-" + i}>Value:</label>
                            <input id={"v-" + i} ref={"v-" + i} className="form-control"/>
                        </div>
                    </div>);
                })}
                {component.state.testingData.length > 0 ? <hr/> : ""}
                <div className={"alert alert-info " + (component.state.testingInfo ? "" : "hide")}>
                    {component.state.testingInfo}
                </div>
                {this.testingDataTable(component)}
            </form>
        );
    };

    testing(component , callback){
        component.setState({
            testingInfo : ""
        });
        let params = {};
        for(let k in component.refs){
            if(k.indexOf("k-") != -1){
                let index = k.split("-")[1];
                let key = component.refs["k-" + index].value;
                let value = component.refs["v-" + index].value;
                params[key] = value;
            }
        }

        if(callback){
            callback.call(this,params);
        }
    };

    testingCondition(type , component){
        let array = component.state.testingCondition;
        if("minus" == type){
            if(array.length == 0){
                return;
            }
            array.pop();
        }else{
            array.push({});
        }

        component.setState({
            testingCondition : array
        });
    };

    testingDataTable(component){
        if(component.state.testingData.length == 0){
            return "";
        }

        return (
            <div id="testingTableDiv">
                <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                    {this.testingDataColumnNames(component)}
                    {this.testingDataBody(component)}
                </table>
            </div>
        );
    };

    testingDataColumnNames(component){
        let data =component.state.testingData[0];
        let array = [];
        for(let k in data){
            array.push(k);
        }

        return (
            <thead>
            <tr>
                {array.map((td , i) => {
                    return <th key={i}>{td}</th>
                })}
            </tr>
            </thead>
        );
    }

    testingDataBody(component){
        let trs = component.state.testingData.map((data , i ) => {
            return (
                <tr key={i}>
                    {this.testingDataTd(data).map((o , j) => {
                        return <td key={j}>{o}</td>;
                    })}
                </tr>
            );
        });
        return <tbody>{trs}</tbody>;
    };

    testingDataTd(data){
        let array = [];
        for(let k in data){
            array.push(data[k]);
        }

        return array;
    };

    buildSql(obj , dataSourceList){
        let dsName = null;

        if(dataSourceList){
            dataSourceList.forEach((o) => {
                if(o.value == obj.dataSourceId){
                    dsName = o.name;
                }
            });
        }

        let dsNameStr = "[ " + dsName + " ]";
        let sql = " select " + obj.columns;
        sql += " from " + obj.tableName;

        if(obj.conditions){
            sql += " where " + obj.conditions;
        }

        if(obj.groupBy){
            sql += " group by " + obj.groupBy;
        }

        if(obj.having){
            sql += " having " + obj.having;
        }

        if(obj.orderBy){
            sql += " order by " + obj.orderBy;
        }

        obj.sqlString = sql;

        return dsName ? (dsNameStr + sql) : sql;
    };
};