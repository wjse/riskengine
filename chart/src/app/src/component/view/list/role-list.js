import "../../../static/scss/list.scss";
import React from "react";
import Ajax from "../../service/ajax";
import DashboardPanel from "../dashboard/panel";
import FormUtil from "../../util/form-util";
import {confirmAlert} from "react-confirm-alert";
import BaseComponent from "../../service/base-component";

export default class RoleListView extends React.Component{

    constructor(props){
        super(props);
        this.a = new Ajax();
        this.state = {
            data : [],
            role : {},
            menuList : [],
            editOpen : false,
            clickText : "",
            editClick : () => {},
            error : null
        };
    };

    componentWillMount(){
        this.loadRoles();
        this.loadMenuList(null , (data) => {this.setState({menuList : data})});
    };

    loadRoles(){
        this.a.get("/role").then((resp) => {
            if(resp && resp.data && resp.data.data){
                if(resp.data.data.length > 0){
                    this.roleClick(resp.data.data[0]);
                }
                this.setState({data : resp.data.data});
            }
        });
    };

    loadMenuList(roleId , callback){
        let params = {isParent : true};
        if(roleId){
           params.roleId = roleId
        }
        
        this.a.get("/menu" , params).then((resp) => {
            if(resp && resp.data && resp.data.data){
                callback.call(this,resp.data.data);
            }
        });
    };

    list(id , body){
        return (
            <div className="dd" id={id}>
                <ol className="dd-list">
                    {body}
                </ol>
            </div>
        );
    };

    roleClick(role){
        if(this.state.editOpen){
            return;
        }
        this.loadMenuList(role.id , (data) => {
            role.menuList = data;
            this.setState({role : role});
        });
    };

    role(){
        return (
            <div>
                {this.list("roleId" , this.state.data.map((role , i) => {
                    return (
                        <li key={i} className="dd-item" data-id={role.id} onClick={this.roleClick.bind(this,role)}>
                            <div className={"dd-handle" + (role.id == this.state.role.id ? " active" : "")}>
                                <p>{role.name}</p>
                            </div>
                            <div className="actions pull-right">
                                <i className="fa fa-edit" onClick={this.openEdit.bind(this,"修改", role , this.update.bind(this,role))}>修改</i>
                                <i className="fa fa-times" onClick={this.delete.bind(this,role)}>删除</i>
                            </div>
                        </li>
                    );
                }))}
                <div className="edit">
                    <DashboardPanel title={this.state.clickText}
                                    className={this.state.editOpen ? "" : "hide"}
                                    width="*"
                                    body={this.editForm()}/>
                </div>
            </div>
        );
    };

    menuList(menuList , role , isChild){
        if(!menuList){
            return "";
        }
        return menuList.map((menu , i) => {
            return (
                <li key={i} className="dd-item" data-id={menu.id}>
                    <div className="dd-handle">
                        <span>
                            {menu.name}
                        </span>
                        {this.chooseMenuBox(role ? role.menuList : null , menu , isChild)}
                    </div>
                    {menu.hasChildren ? <ol className="dd-list">{this.menuList(menu.children , role , true)}</ol> : ""}
                </li>
            );
        });
    };

    chooseMenuBoxObject(roleMenuList , menu){
        let currentMenu = menu , isChecked = false;
        for(let i = 0 ; i < roleMenuList.length; i++) {
            let roleMenu = roleMenuList[i];
            if (roleMenu.id == menu.id) {
                currentMenu = roleMenu;
                isChecked = true;
                break;
            }
        }
        return {currentMenu : currentMenu , isChecked : isChecked};
    };

    chooseMenuBox(roleMenuList , menu , isChild){
        if(!this.state.editOpen){
            return "";
        }

        let currentMenu = menu, isChecked = false;
        if(this.state.clickText == "修改"　&& roleMenuList && !isChild){
            let obj = this.chooseMenuBoxObject(roleMenuList , menu);
            if(obj.currentMenu){
                currentMenu = obj.currentMenu;
                isChecked = obj.isChecked;
            }
        }

        if(isChild && roleMenuList){
            for(let i = 0 ; i < roleMenuList.length; i++){
                let roleMenu = roleMenuList[i];
                if(!roleMenu.hasChildren){
                    continue;
                }

                let obj = this.chooseMenuBoxObject(roleMenu.children , menu);
                if(obj.currentMenu && obj.isChecked){
                    currentMenu = obj.currentMenu;
                    isChecked = obj.isChecked;
                }
            }
        }

        return <input className="choose"
                      id={currentMenu.id}
                      defaultValue={currentMenu.id}
                      type="checkbox"
                      name="chooseMenu"
                      ref={"chooseMenu_" + currentMenu.id}
                      defaultChecked={isChecked}
                      onClick={this.checkboxClick.bind(this)}/>
    };

    checkboxClick(proxy){
        let menuId = proxy.target.value;
        this.menuChecked(this.state.menuList , menuId);
    };

    menuChecked(menuList , menuId){
        let isFind = false , isChecked = this.refs["chooseMenu_" + menuId].checked;
        for(let i = 0 ; i < menuList.length ; i++){
            let menu = menuList[i];
            if(menu.id == menuId && !menu.hasChildren){
                isFind = true;
            }else if(menu.id != menuId && menu.hasChildren){
                let childFind = this.menuChecked(menu.children , menuId);
                if(childFind){
                    if(!isChecked){
                        let anyChildChecked;
                        for(let j = 0 ; j < menu.children.length ; j++){
                            let childMenu = menu.children[j];
                            anyChildChecked = this.refs["chooseMenu_" + childMenu.id].checked;
                            if(anyChildChecked){
                                break;
                            }
                        }
                        isChecked = anyChildChecked;
                    }
                    this.refs["chooseMenu_" + menu.id].checked = isChecked;
                }

            }else if(menu.id == menuId && menu.hasChildren){
                isFind = true;
                for(let j = 0 ; j < menu.children.length ; j++){
                    let childMenu = menu.children[j];
                    this.refs["chooseMenu_" + childMenu.id].checked = isChecked;
                }
            }
        }

        return isFind;
    };

    menu(){
        if(this.state.editOpen){
            if(this.state.clickText == "修改"){
                return this.list("menuList" , this.menuList(this.state.menuList , this.state.role));
            }else{
                return this.list("menuList" , this.menuList(this.state.menuList));
            }
        }else{
            return this.list("menuList" , this.menuList(this.state.role.menuList));
        }
    };

    update(role){
        let name = this.refs.name.value.trim();
        if(!name || "" == name){
            this.error("角色名称不能为空！");
            return;
        }

        let menuIdList = [];
        for(let k in this.refs){
            if(k.startsWith("chooseMenu_")){
                if(this.refs[k].checked){
                    menuIdList.push(this.refs[k].id);
                }
            }
        }

        this.a.put("/role",{id : role.id,name : name , menuIds : menuIdList}).then((resp) => {
            if(resp){
                if(resp.data.status == 200){
                    this.closeEdit();
                    this.loadRoles();
                }else if(resp.data.status == 403){
                    this.error("角色名称已存在！");
                }else{
                    this.error("系统错误！");
                }
            }
        });
    };

    save(){
        let name = this.refs.name.value.trim();
        let role = this.state.role;
        role.name = name;

        if(!name || "" == name){
            this.error("角色名称不能为空！");
            return;
        }

        let menuIdList = [];
        for(let k in this.refs){
            if(k.startsWith("chooseMenu_")){
                if(this.refs[k].checked){
                    menuIdList.push(this.refs[k].id);
                }
            }
        }

        this.a.post("/role",{name : name , menuIds : menuIdList}).then((resp) => {
            if(resp){
                if(resp.data.status == 200){
                    this.closeEdit();
                    this.loadRoles();
                }else if(resp.data.status == 403){
                    this.error("角色名称已存在！");
                }else{
                    this.error("系统错误！");
                }
            }
        });
    };

    delete(obj){
        confirmAlert({
            title : "提示",
            message : "确定删除角色 : "+ obj.name +"？",
            buttons : [{
                label : "确定",
                onClick : () => {
                    this.a.delete("/role/" + obj.id).then((resp) => {
                        if(resp.data.status == 200){
                            this.loadRoles();
                        }else if(resp.data.status == 403){
                            confirmAlert({
                                title : "提示",
                                message : "无法删除该角色，该角色正在使用中！",
                                buttons : [{
                                    label : "确定"
                                }]
                            });
                        }
                    });
                }
            },{
                label : "取消"
            }]
        });
    };

    error(msg){
        this.setState({error : msg});
    };

    addRoleButton(){
        return (
            <div className="actions pull-right">
                <a className="btn btn-primary" onClick={this.openEdit.bind(this,"新增", null ,this.save.bind(this))}>
                    新增
                    <i className="fa fa-plus"></i>
                </a>
            </div>
        );
    };

    openEdit(text , role, callback){
        this.closeEdit();
        if(role){
            this.loadMenuList(role.id , (data) => {
                role.menuList = data;
                this.setState({
                    clickText : text,
                    editOpen : true,
                    editClick : callback,
                    role : role,
                    obj : role
                });
            });
        }else{
            this.setState({
                clickText : text,
                editOpen : true,
                role : {},
                editClick : callback
            });
        }
    };

    closeEdit(){
        this.setState({
            error : "",
            clickText : "",
            editOpen : false,
            editClick : () => {}
        });
    };

    editForm(){
        return (
            <form className="form-horizontal" onSubmit={(e) => {e.preventDefault();}}>
                <div className={"alert alert-danger " + (this.state.error ? "" : "hide")}>{this.state.error}</div>
                {
                    FormUtil.formGroup({name : "name" , label : "名称" , isRequired : true} , FormUtil.formInput({
                        name : "name",
                        value : this.state.role.name,
                        maxLength : 100
                    }))
                }
                <div className="form-btn pull-right">
                    <a className="btn btn-primary" onClick={this.state.editClick.bind(this)}>{this.state.clickText}</a>
                    <a className="btn btn-default" onClick={this.closeEdit.bind(this)}>取消</a>
                </div>
            </form>
        );
    };

    render(){
        return (
            <section id="main-content">
                {BaseComponent.pageHeader("系统管理","角色管理")}
                <div className="row">
                    <DashboardPanel right={this.addRoleButton()} title="角色列表" width="6" body={this.role()}/>
                    <DashboardPanel title="关联菜单" width="6" body={this.menu()}/>
                </div>
            </section>
        );
    };
};