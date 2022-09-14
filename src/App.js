import { useState } from 'react';
import { nanoid } from 'nanoid';
import Layout from './components/Layout/Layout';
import NewNoteForm from './components/Notes/NewNoteForm/NewNoteForm';
import NotesGrid from './components/Notes/NotesGrid/NotesGrid';

import './App.css';

function App() {
    const [notes, setNotes] = useState([]);

    const addNewNoteHandler = (noteData) => {
        const id = nanoid();
        setNotes((prevNotes) => prevNotes.concat([{ ...noteData, id }]));
    };

    return (
        <div className="App">
            <Layout>
                <NewNoteForm addNewNoteHandler={addNewNoteHandler} />
                <NotesGrid notes={notes} />
            </Layout>
        </div>
    );
}

export default App;
