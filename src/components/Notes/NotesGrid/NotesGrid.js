import Masonry from '@mui/lab/Masonry';
import NotePreview from '../NotePreview/NotePreview';

import classes from './NotesGrid.module.css';

function NotesGrid(props) {
    const notePreviews = props.notes.map((elem) => (
        <NotePreview
            key={elem.id}
            id={elem.id}
            title={elem.title}
            content={elem.content}
            notePreviewClickHandler={props.notePreviewClickHandler}
            noteDeleteHandler={props.noteDeleteHandler}
        />
    ));

    return (
        <div className={classes.grid}>
            <Masonry columns={4} spacing={2}>
                {notePreviews}
            </Masonry>
        </div>
    );
}

export default NotesGrid;
