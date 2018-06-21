import React from "react";
import PropTypes from "prop-types";
import NotFound from "../404";
import Error from "../500";

export default class Router extends React.Component{

    forward(path , children){

        if("/500" == path){
            return <Error/>;
        }

        if(!children){
            return;
        }

        if(!children.length){
            if(children.props.path == path){
                return children.props.view;
            }else{
                return <NotFound/>;
            }
        }else{
            let view;

            for(let i in children){
                let child = children[i];
                if(child.props.path == path){
                    view = child.props.view;
                }else{
                    if(child.props.children){
                        view = this.forward(path , child.props.children);
                    }
                }

                if(view){
                    break;
                }
            }

            if(!view){
                return <NotFound/>;
            }

            return view;
        }
    };

    render() {
        if(!this.props.path){
            return "";
        }
        return this.forward(this.props.path , this.props.children);
    };
};

Router.defaultProps = {
    key : Math.random()
};

Router.propTypes = {
    path : PropTypes.string
};

