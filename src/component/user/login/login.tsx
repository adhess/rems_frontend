import {Component} from "react";
import {Redirect} from "react-router";
import "./login.scss"
import {Divider} from "@mui/material";
import {withSnackbar} from "notistack";
import LoginForm from "./loginForm/loginForm";
import SocialLogin from "./socialLogin";
import {compose} from "redux";
import {withTranslation} from "react-i18next";

class Login extends Component<any, any> {
    render() {
        const {t} = this.props;
        if (this.props.authenticated) {
            return <Redirect to={{pathname: "/", state: {from: this.props.location}}}/>;
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h2 style={{display: 'flex', justifyContent: 'center'}}>{t('Welcome to ZLand')}</h2>
                    <LoginForm/>
                    <Divider style={{margin: '1em 0'}}/>
                    <SocialLogin/>
                </div>
            </div>
        );
    }
}

export default compose<any>(withTranslation(), withSnackbar)(Login);