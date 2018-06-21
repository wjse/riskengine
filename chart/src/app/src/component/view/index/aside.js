import "../../../static/scss/index-aside.scss";
import React from "react";
import PubSub from "pubsub-js";
import MenuUtil from "../../util/menu-util";
import PropTypes from "prop-types";
import Ajax from "../../service/ajax";

export default class IndexAside extends React.Component{

    constructor(props){
        super(props);
        this.a = new Ajax();
        this.state = {
            menuList : [],
            isShow : true
        };
    };

    componentWillMount(){
        if(!this.props.roleId){
            return;
        }

        this.a.get("/menu",{roleId : this.props.roleId , isParent : true}).then((resp) => {
            if(resp && resp.data){
                this.setState({menuList : MenuUtil.initMenuList(resp.data.data)});
            }
        });
    };

    componentDidMount(){
        this.pubToken = PubSub.subscribe("index.header.isShowAside" ,(topic , isShow) => {
            this.setState({
                isShow: isShow
            });
        });
    };

    componentWillUnmount(){
        PubSub.unsubscribe(this.pubToken);
    };

    handleClick(menu){
        let menuList = this.state.menuList;
        MenuUtil.click(menu,menuList);

        this.setState({
            menuList : menuList
        });
    };

    renderMenu() {
        let items = this.state.menuList.map((menu, i) => {
            return (
                <li key={i} className={menu.isActive ? "active" : "sub-menu"}>
                    {menu.type == "a" ? this.hrefMenu(menu) : this.normalMenu(menu)}
                    {menu.hasChildren ? this.renderChildrenMenu(menu.children) : ""}
                </li>
            );
        });

        return (<ul className="nano-content menu">{items}</ul>);
    };

    renderChildrenMenu(menuList){
        let items = menuList.map((menu , i) => {
            return (
                <li key={i} className={menu.isActive ? "active" : ""}>
                    {menu.type == "a" ? this.hrefMenu(menu) : this.normalMenu(menu)}
                    {menu.hasChildren ? this.renderChildrenMenu(menu.children) : ""}
                </li>
            );
        });

        return (<ul className="children menu">{items}</ul>);
    };

    hrefMenu(menu){
        return (
            <div>
                {menu.icon ? <i className={"fa fa-" + menu.icon}></i> :""}
                <span>
                    <a target={menu.target} href={menu.path} onClick={this.hrefForward.bind(this,menu)}>{menu.name}</a>
                </span>
            </div>
        );
    };

    hrefForward(menu , e){
        if(menu.target == "iFrame"){
            e.preventDefault();
            PubSub.publish("forwardToIFrame" , menu);
        }
    };

    normalMenu(menu){
        return (
            <div path={menu.path ? menu.path : ""} onClick={this.handleClick.bind(this,menu)}>
                {menu.icon ? <i className={"fa fa-" + menu.icon}></i> :""}
                <span>{menu.name}</span>
                {menu.hasChildren ? <i className={"arrow pull-right fa fa-angle-" + (menu.isOpen ? "down": "right")}></i> : ""}
            </div>
        );
    };

    render(){
        return (
            <aside className={"sidebar " + (this.state.isShow ? "" : "sidebar-toggle")}>
                <div id="leftside-navigation" className="nano">
                    {this.renderMenu()}
                </div>
            </aside>
        );
    };
};

IndexAside.propTypes = {
    roleId :PropTypes.number.isRequired
};