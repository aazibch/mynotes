import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';

import SyncStatusIndicator from './SyncStatusIndicator/SyncStatusIndicator';
import classes from './Header.module.css';

const Header = (props) => {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <FontAwesomeIcon icon={faNoteSticky} /> MyNotes
            </h1>

            <div className={classes.syncIndicator}>
                <SyncStatusIndicator loading={props.loading} />
            </div>
            {/* <p className={classes.attribution + ' text-muted text-small'}>
                Coded by Aazib Chaudhry.
            </p> */}
        </header>
    );
};

export default Header;
