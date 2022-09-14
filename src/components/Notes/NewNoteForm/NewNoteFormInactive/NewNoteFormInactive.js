import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

import classes from './NewNoteFormInactive.module.css';

const NewNoteFormInactive = (props) => {
    return (
        <div
            onClick={props.inactiveFormClickHandler}
            className={classes.newNoteFormInactive}
        >
            <p className={classes.placeholder}>Take a note...</p>
            <button
                className={
                    classes.plusButton +
                    ' buttonNoOutline buttonNoOutline_large'
                }
            >
                <FontAwesomeIcon icon={faSquarePlus} />
            </button>
        </div>
    );
};

export default NewNoteFormInactive;
