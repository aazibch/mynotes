import { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from 'firebase/firestore';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

import database from './firebase-config';
import Layout from './components/Layout/Layout';
import NewNoteForm from './components/Notes/NewNoteForm/NewNoteForm';
import NotesGrid from './components/Notes/NotesGrid/NotesGrid';
import Note from './components/Notes/Note/Note';
import AppMessage from './components/UI/AppMessage/AppMessage';
import Modal from './components/UI/Modal/Modal';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';

import './App.css';

const notesCollectionRef = collection(database, 'notes');

function App() {
    const [notes, setNotes] = useState([]);
    const [openNote, setOpenNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getNotes = async () => {
            const response = await getDocs(notesCollectionRef);

            const updatedNotes = response.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            setNotes(updatedNotes);
            setIsLoading(false);
        };

        getNotes();
    }, []);

    const addNewNoteHandler = async (noteData) => {
        setIsLoading(true);

        const updatedNotes = [...notes];
        const docRef = await addDoc(notesCollectionRef, noteData);
        updatedNotes.splice(0, 0, { ...noteData, id: docRef.id });

        setNotes(updatedNotes);
        setIsLoading(false);
    };

    const notePreviewClickHandler = (noteId) => {
        const openNote = { ...notes.find((note) => note.id === noteId) };

        setOpenNote(openNote);
    };

    const noteDeleteHandler = async (noteId) => {
        setIsLoading(true);
        const docRef = doc(database, 'notes', noteId);
        await deleteDoc(docRef);
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setIsLoading(false);
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

    const openNoteCloseHandler = async () => {
        const prevNote = notes.find((note) => note.id === openNote.id);

        // Update note on backend if edited.
        if (
            prevNote.title !== openNote.title ||
            prevNote.content !== openNote.content
        ) {
            const opnNote = { ...openNote };
            const opnNoteId = opnNote.id;
            delete opnNote.id;

            setOpenNote(null);
            setIsLoading(true);

            const docRef = doc(database, 'notes', opnNoteId);

            await updateDoc(docRef, opnNote);

            const updatedNotes = notes.map((note) => {
                if (note.id === opnNoteId) {
                    return { ...opnNote, id: opnNoteId };
                }

                return note;
            });

            setNotes(updatedNotes);
            setIsLoading(false);
        } else {
            setOpenNote(null);
        }
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

    let notesGrid = <LoadingSpinner />;

    if (!isLoading && notes.length === 0) {
        notesGrid = (
            <AppMessage
                icon={faLightbulb}
                message="Notes you add appear here."
            />
        );
    }

    if (!isLoading && notes.length > 0) {
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
            <Layout>
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
