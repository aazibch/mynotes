import { useEffect, useRef } from 'react';
import { TextareaAutosize } from '@mui/base';

import useClickOutside from '../../../../hooks/useClickOutside';

import classes from './NewNoteFormActive.module.css';

const NewNoteFormActive = (props) => {
    const titleInputRef = useRef();
    const noteInputRef = useRef();

    const activeFormRef = useClickOutside(() => {
        formCloseHandler();
    });

    useEffect(() => {
        noteInputRef.current && noteInputRef.current.focus();
    }, []);

    const formCloseHandler = () => {
        const noteData = {
            title: titleInputRef.current.value,
            content: noteInputRef.current.value
        };

        if (noteData.content.length > 0 || noteData.title.length > 0) {
            props.addNewNoteHandler(noteData);
        }

        props.activeFormCloseHandler();
    };

    return (
        <div ref={activeFormRef} className={classes.newNoteFormActive}>
            <TextareaAutosize
                className={classes.titleInput}
                placeholder="Title"
                ref={titleInputRef}
                onChange={props.removeLineBreaksFromInput}
            />
            <TextareaAutosize
                ref={noteInputRef}
                className={classes.noteInput}
                placeholder="Take a note..."
            />
            <button
                className={'button ' + classes.closeButton}
                onClick={formCloseHandler}
            >
                Close
            </button>
        </div>
    );
};

export default NewNoteFormActive;
