import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import classes from './NotePreview.module.css';

function NotePreview(props) {
    let title;
    let content = props.content;

    if (props.title)
        title = <h2 className={classes.noteTitle}>{props.title}</h2>;

    const allowedLength = 555;
    if (props.content.length > allowedLength) {
        content = content.substring(0, allowedLength) + '...';
    }

    return (
        <div className={classes.note} style={props.styles}>
            <div
                className={classes.main}
                onClick={() => props.notePreviewClickHandler(props.id)}
            >
                {title}
                <div className={classes.noteContent}>{content}</div>
            </div>
            <div className={classes.footer}>
                <button
                    className="buttonNoOutline"
                    onClick={() => props.noteDeleteHandler(props.id)}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
        </div>
    );
}

export default NotePreview;
