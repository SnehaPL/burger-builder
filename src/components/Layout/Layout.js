import React from 'react';
import Aux from '../../hoc/Auxiliary.js';
import ToolBar from '../Navigation/Toolbar/Toolbar.js';
import classes from './Layout.css';

const layout = (props) => (
    <Aux>
        <ToolBar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
