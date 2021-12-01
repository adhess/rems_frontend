import {Component} from "react";
import {Redirect} from "react-router";
import "./login.scss"
import {Divider} from "@mui/material";
import {withSnackbar} from "notistack";
import LoginForm from "./loginForm/loginForm";
import SocialLogin from "./socialLogin";

class Login extends Component<any, any> {
    render() {
        if (this.props.authenticated) {
            return <Redirect to={{pathname: "/", state: {from: this.props.location}}}/>;
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h2 style={{display: 'flex', justifyContent: 'center'}}>Welcome to zLand</h2>
                    <LoginForm/>
                    <Divider style={{margin: '1em 0'}}/>
                    <SocialLogin/>
                </div>
            </div>
        );
    }
}

export default withSnackbar(Login);