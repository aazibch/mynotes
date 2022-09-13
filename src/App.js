import Layout from './components/Layout/Layout';
import NewNoteControls from './components/Notes/NewNoteControls/NewNoteControls';

import './App.css';

function App() {
    return (
        <div className="App">
            <Layout>
                <NewNoteControls />
            </Layout>
        </div>
    );
}

export default App;
