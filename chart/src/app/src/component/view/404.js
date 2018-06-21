import "../../static/scss/main.scss";
import React from "react";

export default class NotFound extends React.Component{

    render(){
        return(
            <section id="error-container">

                <div className="block-error">

                    <header>
                        <h1 className="error">404</h1>
                        <p className="text-center">没找到页面</p>
                    </header>

                    <p className="text-center">嘿，我们在加载您想访问的页面时发现哪儿有什么不对劲</p>
                    <div className="row">
                        <div className="col-md-*">
                            <a className="btn btn-info btn-block btn-3d" href="/">返回控制面板</a>
                        </div>
                    </div>
                </div>

            </section>
        );
    };
};