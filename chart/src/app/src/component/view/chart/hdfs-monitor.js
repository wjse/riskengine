import "../../../static/scss/monitor.scss";
import Ajax from "../../service/ajax";
import React from "react";
import ReactLoading from "react-loading";

export default class HDFSMonitor extends React.Component{

    constructor(props){
        super(props);
        this.state = {data : [] , isLoading : true};
    };

    componentWillMount(){
        this.loadMonitor();
        this.interval = setInterval(() => {
            this.loadMonitor();
        } , 30000);
    };

    // componentDidMount(){
    //     this.interval = setInterval(() => {
    //         this.loadMonitor();
    //     } , 30000);
    // };

    componentWillUnmount(){
        clearInterval(this.interval);
    };

    loadMonitor(){
        this.setState({isLoading : true});
        new Ajax().get("/dashboard/monitor").then((resp) => {
            if(resp && resp.data.data && resp.status == 200){
                this.setState({
                    data : resp.data.data,
                    isLoading : false
                });
            }
        });
    };

    hostStatus(status){
        return <i className={"fa " + (status == "HEALTHY" ? "fa-check-circle" : "fa-exclamation-triangle")}></i>;
    };

    hostVersion(version){
        return version.stack + "-" + version.version;
    };

    hostRam(host){
        let total = 0, free = 0;

        if(host.metrics){
            total = host.metrics.memory.mem_total,
                free = host.metrics.memory.mem_free;
        }

        let useage = ((total - free) / total * 100).toFixed(1);
        return (
            <div className="progress progress-striped active">
                <div className="progress-bar progress-bar-primary" style={{width : useage + "%"}}>{useage + "%"}</div>
            </div>
        );
    };

    hostDisk(host){
        let total = 0, free = 0;

        if(host.metrics){
            total = host.metrics.disk.disk_total,
                free = host.metrics.disk.disk_free;
        }

        let useage = ((total - free) / total * 100).toFixed(1);

        return (
            <div className="progress progress-striped active">
                <div className="progress-bar progress-bar-success" style={{width : useage + "%"}}>{useage + "%"}</div>
            </div>
        );
    };

    monitorItems(){
        return this.state.data.map(function(host , i){
            return (
                <tr key={i}>
                    <td width="2%" className="center">{this.hostStatus(host.Hosts.host_status)}</td>
                    <td width="15%">{host.Hosts.host_name}</td>
                    <td width="15%">{host.Hosts.ip}</td>
                    <td width="8%" className="center">{host.Hosts.cpu_count}</td>
                    <td>{this.hostRam(host)}</td>
                    <td>{this.hostDisk(host)}</td>
                    <td width="10%">{this.hostVersion(host.stack_versions[0].HostStackVersions)}</td>
                </tr>
            );
        } , this);
    };

    render(){
        return (
            <div className="monitor" style={{height : this.props.height ? this.props.height : "300px"}}>
                <ReactLoading type="spokes" color="#1abc9c" className={"loading " + (this.state.isLoading ? "" : "hide")}/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th></th>
                        <th>节点名称</th>
                        <th>IP地址</th>
                        <th>CPU核数</th>
                        <th>内存使用</th>
                        <th>硬盘使用</th>
                        <th>HDFS版本</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.monitorItems()}
                    </tbody>
                </table>
            </div>
        );
    };
};