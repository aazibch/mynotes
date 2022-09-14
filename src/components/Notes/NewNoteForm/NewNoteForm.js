import { useState } from 'react';

import NewNoteFormInactive from './NewNoteFormInactive/NewNoteFormInactive';
import NewNoteFormActive from './NewNoteFormActive/NewNoteFormActive';

import classes from './NewNoteForm.module.css';

const NewNoteForm = (props) => {
    const [formActive, setFormActive] = useState(false);

    const inactiveFormClickHandler = () => {
        setFormActive(true);
    };

    const activeFormCloseHandler = () => {
        setFormActive(false);
    };

    let form;

    if (formActive) {
        form = (
            <NewNoteFormActive
                activeFormCloseHandler={activeFormCloseHandler}
                removeLineBreaksFromInput={props.removeLineBreaksFromInput}
                addNewNoteHandler={props.addNewNoteHandler}
            />
        );
    } else {
        form = (
            <NewNoteFormInactive
                inactiveFormClickHandler={inactiveFormClickHandler}
            />
        );
    }

    return <div className={classes.newNoteForm}>{form}</div>;
};

export default NewNoteForm;
