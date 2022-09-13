import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

import classes from './NewNoteControls.module.css';

const NewNoteControls = (props) => {
    const newNoteControlsClasses = [classes.newNoteControls];

    if (!props.active) {
        newNoteControlsClasses.push(classes.newNoteControls_inactive);
    }

    return (
        <div className={newNoteControlsClasses.join(' ')}>
            <p>Take a note...</p>
            <FontAwesomeIcon className={classes.plusIcon} icon={faSquarePlus} />
        </div>
    );
};

export default NewNoteControls;
