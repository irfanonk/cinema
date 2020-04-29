import React from 'react'
import ReactDOM from 'react-dom';


//we should make sure this modal rendered directly on body
//like #root element 


const Modal = props => {
     console.log('modal')

        return  ReactDOM.createPortal(
            //history.push we reroute user to main path
            //when user clicks (onClick) outside the modal
            //normally  modal disappears when clicking on it except delete button
            //stopPropagation prevent this.
            <div 
            onClick={props.onDismiss} 
            className="ui dimmer modals visible active" >
                <div onClick={(e) => e.stopPropagation()} 
                className="ui standard modal visible active" style={{textAlign:'center'}}>
                    <div className="header">{props.title}</div>
                    <div className="content">{props.content}</div>
                    <div className="actions">
                        {props.actions}
                    </div>
                </div>
            </div>,
            document.querySelector('#modal')
        ) 

};
 
export default Modal;

