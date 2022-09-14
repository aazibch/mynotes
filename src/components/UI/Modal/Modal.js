import Overlay from './Overlay/Overlay';

import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        <Overlay modalCloseHandler={props.modalCloseHandler}>
            <div ref={props.modalRef} className={classes.modal}>
                {props.children}
            </div>
        </Overlay>
    );
};

export default Modal;
