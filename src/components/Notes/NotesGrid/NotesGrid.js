import Masonry from '@mui/lab/Masonry';
import NotePreview from '../NotePreview/NotePreview';

import classes from './NotesGrid.module.css';

function NotesGrid(props) {
    const notePreviews = props.notes.map((elem) => {
        let styles = { visibility: 'visible' };

        if (elem.id === props.openNoteId) {
            styles = { visibility: 'hidden' };
        }

        return (
            <NotePreview
                key={elem.id}
                id={elem.id}
                styles={styles}
                title={elem.title}
                content={elem.content}
                persisted={elem.persisted}
                notePreviewClickHandler={props.notePreviewClickHandler}
                noteDeleteHandler={props.noteDeleteHandler}
            />
        );
    });

    return (
        <div className={classes.grid}>
            <Masonry columns={4} spacing={2}>
                {notePreviews}
            </Masonry>
        </div>
    );
}

export default NotesGrid;
