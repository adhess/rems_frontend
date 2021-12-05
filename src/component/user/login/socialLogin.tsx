import {Component} from "react";
import {FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL} from "../../../constants";
import googleLogo from "../../../assets/img/google-logo.png";
import fbLogo from "../../../assets/img/fb-logo.png";
import {compose} from "redux";
import {withTranslation} from "react-i18next";

class SocialLogin extends Component<any, any> {
    render() {
        const {t} = this.props;
        return (
            <div className="social-login">
                <p>{t('Or connect with')}:</p>
                <a href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google"/>
                    {t('Continue with Google')}
                </a>

                <a href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Google"/>
                    <p>{t('Continue with Facebook')}</p>
                </a>
            </div>
        )
    }
}

export default compose<any>(withTranslation())(SocialLogin);