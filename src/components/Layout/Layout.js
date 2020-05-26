import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary.js';
import ToolBar from '../Navigation/Toolbar/Toolbar.js';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer.js';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerHandler = () => {
        this.setState(
            (prevState) => {return {showSideDrawer: !prevState.showSideDrawer} ;}
        );
    }

    render(){
        return (
            <Aux>
                <ToolBar drawerToggleClicked= {this.sideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
