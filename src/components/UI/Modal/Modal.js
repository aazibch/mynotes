import { useRef } from 'react';
import Overlay from './Overlay/Overlay';

import classes from './Modal.module.css';

const Modal = (props) => {
    const modalRef = useRef();

    const modalCloseHandler = (e) => {
        if (!modalRef.current.contains(e.target)) {
            props.modalCloseHandler();
        }
    };

    return (
        <Overlay modalCloseHandler={modalCloseHandler}>
            <div ref={modalRef} className={classes.modal}>
                {props.children}
            </div>
        </Overlay>
    );
};

export default Modal;
