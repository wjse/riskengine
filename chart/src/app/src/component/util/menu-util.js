import PubSub from "pubsub-js";


export default class MenuUtil{

    static initMenuList(menuList , parent){
        if(!menuList || menuList.length == 0){
            return [];
        }
        if(!parent){
            menuList[0].isActive = true;
            PubSub.publish("index.first.menu" , menuList[0]);
        }
        return Array.from(menuList).map((menu) => {
            if(parent){
                menu.parent = parent;
            }

            if(menu.hasChildren){
                menu.children = MenuUtil.initMenuList(menu.children , menu);
                menu.isOpen = false;
            }
            return menu;
        });
    };

    static click(menu , menuList){
        for(let i in menuList){
            let _menu = menuList[i];
            if(_menu.id == menu.id) {
                if (_menu.isActive && _menu.hasChildren) {
                    _menu.isActive = false;
                    _menu.isOpen = false;
                    MenuUtil.closeChildren(_menu);
                } else {
                    _menu.isActive = true;
                    _menu.isOpen = true;
                    if(!_menu.hasChildren){
                        PubSub.publish("forward" , menu);
                    }
                }
            }else{
                _menu.isActive = false;
                if(_menu.children){
                    if(MenuUtil.findInChildren(_menu.children , menu)){
                        _menu.isActive = true;
                        _menu.isOpen = true;
                    }
                }
            }
        }
    };

    static findInChildren(menuList , menu){
        let isFind = false;
        for(let i in menuList){
            let _menu = menuList[i];
            if(_menu.id == menu.id){
                if (_menu.isActive && _menu.hasChildren) {
                    _menu.isActive = false;
                    _menu.isOpen = false;
                    MenuUtil.closeChildren(_menu);
                } else {
                    _menu.isActive = true;
                    _menu.isOpen = true;
                    PubSub.publish("forward" , menu);
                }
                _menu.parent.isActive = true;
                isFind = true;
            }else{
                _menu.isActive = false;
                if(MenuUtil.findInChildren(_menu.children , menu)){
                    isFind = true;
                }
            }
        }

        return isFind;
    };

    static closeChildren(menu){
        if(menu.children){
            for(let i in menu.children){
                menu.children[i].isActive = false;
                menu.children[i].isOpen = false;
            }
        }
    };
}