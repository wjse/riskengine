import "../../static/scss/main.scss";
import React from "react";

export default class Page extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            page : {
                navigatepageNums : [],
                firstPage : 1,
                lastPage : 1,
                pageNum : 1
            }
        }
        ;
    };

    componentWillReceiveProps(props){
        if(props.data){
            this.setState({
                page : props.data
            });
        }
    };

    prev(){
        let pageNum = this.state.page.pageNum - 1;
        this.props.click(pageNum <= 0 ? 1 : pageNum);
    };

    go(pageNum){
        this.props.click(pageNum);
    };

    next(){
        let pageNum = this.state.page.pageNum + 1;
        let lastPageNum = this.state.page.lastPage;
        this.props.click(pageNum > lastPageNum ? lastPageNum : pageNum);
    };

    render(){
        let page = this.state.page;
        return (
            <nav className="page-nav" aria-label="Page navigation">
                <ul className="pagination">
                    <li className={page.firstPage == page.pageNum ? "disabled" : ""}>
                        <a href="#" aria-label="Previoys" onClick={this.prev.bind(this)}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {page.navigatepageNums.map((n , i) => {
                        return (
                            <li key={i} className={page.pageNum == n ? "active" : ""}>
                                <a href="#" onClick={this.go.bind(this,n)}>{n}</a>
                            </li>
                        );
                    })}
                    <li className={page.lastPage == page.pageNum ? "disabled" : ""}>
                        <a href="#" aria-label="Next" onClick={this.next.bind(this)}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    };
};