import Header from './Header/Header';

import classes from './Layout.module.css';

const Layout = (props) => {
    return (
        <>
            <Header loading={props.loading} />
            <main className={classes.main}>{props.children}</main>
        </>
    );
};

export default Layout;
