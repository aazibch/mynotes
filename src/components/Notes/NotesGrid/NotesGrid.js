import Masonry from '@mui/lab/Masonry';
import Note from '../Note/Note';

import classes from './NotesGrid.module.css';

function NotesGrid(props) {
    const notes = props.notes.map((elem) => (
        <Note
            key={elem.id}
            id={props.id}
            title={elem.title}
            content={elem.content}
        />
    ));

    return (
        <div className={classes.grid}>
            <Masonry columns={4} spacing={2}>
                {notes}
            </Masonry>
        </div>
    );
}

export default NotesGrid;
