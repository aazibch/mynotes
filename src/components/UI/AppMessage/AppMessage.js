import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './AppMessage.module.css';

const AppMessage = (props) => {
    let icon;

    if (props.icon) {
        icon = <FontAwesomeIcon className={classes.icon} icon={props.icon} />;
    }

    return (
        <div className={classes.appMessage}>
            {icon}
            <p>{props.message}</p>
        </div>
    );
};

export default AppMessage;
