import { useState } from 'react';
import { nanoid } from 'nanoid';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

import Layout from './components/Layout/Layout';
import NewNoteForm from './components/Notes/NewNoteForm/NewNoteForm';
import NotesGrid from './components/Notes/NotesGrid/NotesGrid';
import Note from './components/Notes/Note/Note';
import AppMessage from './components/UI/AppMessage/AppMessage';
import Modal from './components/UI/Modal/Modal';

import './App.css';

function App() {
    const [notes, setNotes] = useState([
        {
            id: 1,
            title: 'Car Information',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum tempus purus nec finibus. Duis eleifend ac ipsum id bibendum. Ut tempor metus dui, vitae maximus metus varius facilisis. Cras viverra ullamcorper laoreet. Morbi malesuada vel ipsum vel mattis. Quisque scelerisque orci ac nunc sollicitudin suscipit. Aliquam nec sem ac nisi fermentum semper porttitor eu mi. Nullam malesuada interdum lectus sed dapibus. Suspendisse faucibus gravida ipsum, vitae interdum erat auctor tempus. Maecenas massa purus, luctus in hendrerit ac, ultrices non elit. Cras malesuada nisi vel turpis pharetra, at malesuada ipsum ullamcorper. Praesent placerat ex metus, sed sagittis dui pellentesque ut. Nulla auctor turpis sit amet vehicula porta. Sed dignissim vestibulum mattis.'
        },
        {
            id: 2,
            title: 'My Friends',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum tempus purus nec finibus. Duis eleifend ac ipsum id bibendum. Ut tempor metus dui, vitae maximus metus varius facilisis. Cras viverra ullamcorper laoreet. Morbi malesuada vel ipsum vel mattis. Quisque scelerisque orci ac nunc sollicitudin suscipit.'
        },
        {
            id: 3,
            title: '',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum tempus purus nec finibus. Duis eleifend ac ipsum id bibendum. Ut tempor metus dui, vitae maximus metus varius facilisis. Cras viverra ullamcorper laoreet. Morbi malesuada vel ipsum vel mattis. Quisque scelerisque orci ac nunc sollicitudin suscipit. Aliquam nec sem ac nisi fermentum semper porttitor eu mi. Nullam malesuada interdum lectus sed dapibus. Suspendisse faucibus gravida ipsum, vitae interdum erat auctor tempus. Maecenas massa purus, luctus in hendrerit ac, ultrices non elit. Cras malesuada nisi vel turpis pharetra, at malesuada ipsum ullamcorper. Praesent placerat ex metus, sed sagittis dui pellentesque ut.'
        },
        {
            id: 4,
            title: "TV Series I've Seen",
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum tempus purus nec finibus. Duis eleifend ac ipsum id bibendum. Ut tempor metus dui, vitae maximus metus varius facilisis. Cras viverra ullamcorper laoreet. Morbi malesuada vel ipsum vel mattis. Quisque scelerisque orci ac nunc sollicitudin suscipit. Aliquam nec sem ac nisi fermentum semper porttitor eu mi.'
        },
        {
            id: 5,
            title: 'Random Note',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 6,
            title: 'My Favorite Quote',
            content: 'Two bananas are better than one. - Gorilla'
        },
        {
            id: 7,
            title: 'Stoic Philosophy',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum tempus purus nec finibus. Duis eleifend ac ipsum id bibendum. Ut tempor metus dui, vitae maximus metus varius facilisis. Cras viverra ullamcorper laoreet. Morbi malesuada vel ipsum vel mattis. Quisque scelerisque orci ac nunc sollicitudin suscipit. Aliquam nec sem ac nisi fermentum semper porttitor eu mi. Nullam malesuada interdum lectus sed dapibus. Suspendisse faucibus gravida ipsum, vitae interdum erat auctor tempus. Maecenas massa purus, luctus in hendrerit ac, ultrices non elit. Cras malesuada nisi vel turpis pharetra, at malesuada ipsum ullamcorper. Praesent placerat ex metus, sed sagittis dui pellentesque ut.'
        },
        {
            id: 8,
            title: '',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum tempus purus nec finibus. Duis eleifend ac ipsum id bibendum. Ut tempor metus dui, vitae maximus metus varius facilisis. Cras viverra ullamcorper laoreet. Morbi malesuada vel ipsum vel mattis. Quisque scelerisque orci ac nunc sollicitudin suscipit. Aliquam nec sem ac nisi fermentum semper porttitor eu mi. Nullam malesuada interdum lectus sed dapibus. Suspendisse faucibus gravida ipsum, vitae interdum erat auctor tempus. Maecenas massa purus, luctus in hendrerit ac, ultrices non elit.'
        }
    ]);
    const [openNote, setOpenNote] = useState(null);

    const addNewNoteHandler = (noteData) => {
        const id = nanoid();
        setNotes((prevNotes) => prevNotes.concat([{ ...noteData, id }]));
    };

    const notePreviewClickHandler = (noteId) => {
        const openNote = { ...notes.find((note) => note.id === noteId) };

        setOpenNote(openNote);
    };

    const noteDeleteHandler = (noteId) => {
        const updatedNotes = notes.filter((note) => note.id !== noteId);

        setNotes(updatedNotes);
    };

    const removeLineBreaksFromInput = (e) => {
        // Remove all line breaks from input
        e.target.value = e.target.value.replace(/[\r\n]/gm, '');
    };

    const openNoteTitleChangeHandler = (e) => {
        removeLineBreaksFromInput(e);

        setOpenNote((prevOpenNote) => {
            return { ...prevOpenNote, title: e.target.value };
        });
    };

    const openNoteContentChangeHandler = (e) => {
        setOpenNote((prevOpenNote) => {
            return { ...prevOpenNote, content: e.target.value };
        });
    };

    const openNoteDeleteHandler = (noteId) => {
        noteDeleteHandler(noteId);
        setOpenNote(null);
    };

    const openNoteCloseHandler = () => {
        const updatedNotes = notes.map((note) => {
            if (note.id === openNote.id) {
                return { ...openNote };
            }

            return note;
        });

        setOpenNote(null);
        setNotes(updatedNotes);
    };

    let openNoteJsx;

    if (openNote) {
        openNoteJsx = (
            <Modal openNoteCloseHandler={openNoteCloseHandler}>
                <Note
                    id={openNote.id}
                    title={openNote.title}
                    content={openNote.content}
                    openNoteTitleChangeHandler={openNoteTitleChangeHandler}
                    openNoteContentChangeHandler={openNoteContentChangeHandler}
                    openNoteCloseHandler={openNoteCloseHandler}
                    openNoteDeleteHandler={openNoteDeleteHandler}
                />
            </Modal>
        );
    }

    return (
        <div className="App">
            <Layout>
                {openNoteJsx}
                <NewNoteForm
                    removeLineBreaksFromInput={removeLineBreaksFromInput}
                    addNewNoteHandler={addNewNoteHandler}
                />
                {notes.length > 0 ? (
                    <NotesGrid
                        noteDeleteHandler={noteDeleteHandler}
                        notes={notes}
                        openNoteId={openNote?.id}
                        notePreviewClickHandler={notePreviewClickHandler}
                    />
                ) : (
                    <AppMessage
                        icon={faLightbulb}
                        message="Notes you add appear here."
                    />
                )}
            </Layout>
        </div>
    );
}

export default App;
