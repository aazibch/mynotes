import classes from './Overlay.module.css';

const Overlay = (props) => {
    return (
        <div onClick={props.modalCloseHandler} className={classes.overlay}>
            {props.children}
        </div>
    );
};

export default Overlay;
