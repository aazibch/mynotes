import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';

import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <FontAwesomeIcon icon={faNoteSticky} /> MyNotes
            </h1>

            <p className={classes.attribution + ' text-muted text-small'}>
                Coded by Aazib Chaudhry.
            </p>
        </header>
    );
};

export default Header;
