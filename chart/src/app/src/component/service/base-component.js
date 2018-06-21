import React from 'react';
export default class BaseComponent extends React.Component{

    static pageHeader(parent , title){
        return (
            <div className="row">
                <div className="col-md-12">
                    <ul className="breadcrumb" style={{background: "0 0"}}>
                        <li><a href="/">控制面板</a></li>
                        {null == parent ? "" : <li>{parent}</li>}
                        <li className="active">{title}</li>
                    </ul>
                    <h1 className="h1">{title}</h1>
                </div>
            </div>
        );
    };

    static tableBody(thead , data , tableColumnsFun){
        if(!data){
            return;
        }
        return (
            <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                <thead>
                <tr>
                    {
                        thead.map((head, i) => {
                            return <th key={i} className={i == (thead.length - 1) ? "center" : ""}>{head}</th>
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    data.map((obj, i) => {
                        return <tr key={i} id={"data-" + obj.id}>{tableColumnsFun.call(this,obj)}</tr>
                    })
                }
                </tbody>
            </table>
        );
    };
};