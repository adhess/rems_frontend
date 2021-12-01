import React, {Component, ComponentType} from 'react';
import './App.scss';
import {Route, Switch} from "react-router-dom";
import OAuth2RedirectHandler from "../component/user/oauth2/oAuth2RedirectHandler";
import Profile from "../component/user/profile/profile"
import {getCurrentUser} from "../utils/APIUtils";
import {Navbar} from "../component";
import Home from "../component/home/Home";
import {connect} from "react-redux";
import {LOGIN} from "../store/actions";
import {compose} from "redux";
import {withSnackbar} from "notistack";
import {ACCESS_TOKEN} from "../constants";


class App extends Component<any, any> {

    render() {
        return (
            <div className="app">
                <div className="navbar">
                    <Navbar/>
                </div>
                <div className="main">
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
                        <Route path="/profile" exact component={Profile}/>
                    </Switch>
                </div>
                <div className="footer">
                    <p>All rights reserved: © 2022 zLand</p>
                </div>
            </div>

        );
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    loadCurrentlyLoggedInUser() {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            getCurrentUser()
                .then(user => {
                    this.props.login(user.data);
                })
                .catch(error => {
                    console.log(error);
                    this.props.enqueueSnackbar("Oops! Something went wrong. Please try again!", {variant: 'error'});
                });
        }
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (user: any) => dispatch({type: LOGIN, user: user})
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}
export default compose<ComponentType>(withSnackbar, connect(mapStateToProps, mapDispatchToProps))(App);
