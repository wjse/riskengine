import React from "react";
import ReactModal from "react-modal";
import ModalStyle from "../../data/modal-style.json";
import PropTypes from "prop-types";


export default class Modal extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen : props.isOpen
        };
        this.closeModal = this.closeModal.bind(this);
    };

    closeModal(){
        this.setState({isOpen : false});
        if(this.props.close){
            this.props.close.call();
        }
    };

    componentWillReceiveProps(props){
        this.setState({isOpen : props.isOpen});
    };

    styles(){
        return {content : (this.props.styles ? this.props.styles : ModalStyle)};
    };

    cancelText(){
        if(!this.props.click && this.props.clickText){
            return this.props.clickText;
        }

        return this.props.click  ? "取消" : "确定";
    };

    render() {
        return (
            <ReactModal isOpen={this.state.isOpen} style={this.styles()}>
                <div id={this.props.id ? this.props.id : ""} className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <a className="close" onClick={this.closeModal}>X</a>
                            <h4 className="modal-title">{this.props.title}</h4>
                        </div>
                        <div className="modal-body">{this.props.body}</div>
                        <div className="modal-footer">
                            <a className="btn btn-default" onClick={this.closeModal}>
                                {this.cancelText()}
                            </a>
                            {
                                this.props.click ?
                                    <a className="btn btn-primary" onClick={this.props.click}>
                                        {this.props.clickText ? this.props.clickText : "确定"}
                                    </a>
                                    : ""
                            }
                        </div>
                    </div>
                </div>
            </ReactModal>
        );
    };
};
Modal.propTypes = {
    isOpen : PropTypes.bool.isRequired,
    title : PropTypes.string.isRequired,
    body : PropTypes.object.isRequired,
    click : PropTypes.func,
    clickText : PropTypes.string
};

ReactModal.setAppElement('body');