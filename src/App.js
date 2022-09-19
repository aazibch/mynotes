import { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    query,
    orderBy
} from 'firebase/firestore';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { nanoid } from 'nanoid';

import database from './firebase-config';
import Layout from './components/Layout/Layout';
import NewNoteForm from './components/Notes/NewNoteForm/NewNoteForm';
import NotesGrid from './components/Notes/NotesGrid/NotesGrid';
import Note from './components/Notes/Note/Note';
import AppMessage from './components/UI/AppMessage/AppMessage';
import Modal from './components/UI/Modal/Modal';

import './App.css';

const notesCollectionRef = collection(database, 'notes');

function App() {
    const [notes, setNotes] = useState([]);
    const [openNote, setOpenNote] = useState(null);
    const [notesLoading, setNotesLoading] = useState(true);
    const [notesSyncing, setNotesSyncing] = useState(false);

    useEffect(() => {
        console.log('rendered', notes);
    });

    useEffect(() => {
        const getNotes = async () => {
            const q = query(notesCollectionRef, orderBy('createdAt', 'desc'));
            const response = await getDocs(q);

            const updatedNotes = response.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            setNotes(updatedNotes);
            setNotesLoading(false);
        };

        getNotes();
    }, []);

    const addNewNoteHandler = async (noteData) => {
        // Store in state before database save.
        setNotesSyncing(true);
        const newNote = {
            ...noteData,
            persisted: false,
            id: nanoid() + '-nano'
        };

        setNotes((prevNotes) => {
            const updatedNotes = [...prevNotes];

            updatedNotes.splice(0, 0, newNote);
            return updatedNotes;
        });

        // Save to database and update state
        const docRef = await addDoc(notesCollectionRef, {
            ...noteData,
            persisted: true,
            createdAt: new Date()
        });

        setOpenNote((prevOpenNote) => {
            if (prevOpenNote?.id === newNote.id) {
                return {
                    ...prevOpenNote,
                    id: docRef.id,
                    persisted: true
                };
            }

            return prevOpenNote;
        });

        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((note) => {
                if (note.id === newNote.id) {
                    return { ...note, id: docRef.id, persisted: true };
                }

                return note;
            });

            return updatedNotes;
        });
        setNotesSyncing(false);
    };

    const notePreviewClickHandler = (noteId) => {
        const openNote = { ...notes.find((note) => note.id === noteId) };

        setOpenNote(openNote);
    };

    const noteDeleteHandler = async (noteId) => {
        setNotesSyncing(true);
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setNotes(updatedNotes);

        const docRef = doc(database, 'notes', noteId);
        await deleteDoc(docRef);
        setNotesSyncing(false);
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

    const openNoteCloseHandler = async () => {
        setNotesSyncing(true);
        const prevNote = notes.find((note) => note.id === openNote.id);

        if (
            prevNote.title === openNote.title &&
            prevNote.content === openNote.content
        ) {
            return setOpenNote(null);
        }

        // Update note
        const updatedNotes = notes.map((note) => {
            if (note.id === openNote.id) {
                return { ...openNote };
            }

            return note;
        });
        setNotes(updatedNotes);

        const closedNote = { ...openNote };
        setOpenNote(null);

        const docRef = doc(database, 'notes', closedNote.id);
        await updateDoc(docRef, closedNote);
        setNotesSyncing(false);
    };

    const noteModalCloseHandler = () => {
        if (openNote.persisted) {
            openNoteCloseHandler();
        }
    };

    let openNoteJsx;

    if (openNote) {
        console.log('openNoteId', openNote.id);
        openNoteJsx = (
            <Modal modalCloseHandler={noteModalCloseHandler}>
                <Note
                    id={openNote.id}
                    title={openNote.title}
                    content={openNote.content}
                    persisted={openNote.persisted}
                    openNoteTitleChangeHandler={openNoteTitleChangeHandler}
                    openNoteContentChangeHandler={openNoteContentChangeHandler}
                    openNoteCloseHandler={openNoteCloseHandler}
                    openNoteDeleteHandler={openNoteDeleteHandler}
                />
            </Modal>
        );
    }

    let notesGrid;

    if (!notesLoading && notes.length === 0) {
        notesGrid = (
            <AppMessage
                icon={faLightbulb}
                message="Notes you add appear here."
            />
        );
    }

    if (!notesLoading && notes.length > 0) {
        notesGrid = (
            <NotesGrid
                noteDeleteHandler={noteDeleteHandler}
                notes={notes}
                openNoteId={openNote?.id}
                notePreviewClickHandler={notePreviewClickHandler}
            />
        );
    }

    return (
        <div className="App">
            <Layout loading={notesLoading || notesSyncing}>
                {openNoteJsx}
                <NewNoteForm
                    removeLineBreaksFromInput={removeLineBreaksFromInput}
                    addNewNoteHandler={addNewNoteHandler}
                />
                {notesGrid}
            </Layout>
        </div>
    );
}

export default App;
