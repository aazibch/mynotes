import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import classes from './Note.module.css';

function Note(props) {
    let title;

    if (props.title)
        title = <h2 className={classes.noteTitle}>{props.title}</h2>;

    return (
        <div className={classes.note}>
            <div className={classes.main}>
                {title}
                <div className={classes.noteContent}>{props.content}</div>
            </div>
            <div className={classes.footer}>
                <button className="buttonNoOutline">
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button className="buttonNoOutline">
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </div>
        </div>
    );
}

export default Note;
