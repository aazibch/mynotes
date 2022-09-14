import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TextareaAutosize } from '@mui/base';
import classes from './Note.module.css';

const Note = (props) => {
    return (
        <div className={classes.note}>
            <div className={classes.main}>
                <TextareaAutosize
                    className={classes.titleInput}
                    placeholder="Title"
                    value={props.title}
                    onChange={props.openNoteTitleChangeHandler}
                />
                <TextareaAutosize
                    className={classes.noteInput}
                    placeholder="Take a note..."
                    value={props.content}
                    onChange={props.openNoteContentChangeHandler}
                />
            </div>
            <div className={classes.footer}>
                <button
                    className="buttonNoOutline"
                    onClick={() => props.openNoteDeleteHandler(props.id)}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button
                    className={'button ' + classes.closeButton}
                    onClick={() => props.openNoteCloseHandler(props.id)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Note;
