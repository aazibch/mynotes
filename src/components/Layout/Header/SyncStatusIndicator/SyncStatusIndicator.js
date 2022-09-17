import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import classes from './SyncStatusIndicator.module.css';

const SyncStatusIndicator = (props) => {
    return (
        <div>
            {props.loading ? (
                <FontAwesomeIcon
                    className={classes.icon}
                    icon={faCircleNotch}
                    spin
                />
            ) : (
                <FontAwesomeIcon
                    className={classes.icon}
                    icon={faCircleCheck}
                />
            )}
        </div>
    );
};

export default SyncStatusIndicator;
