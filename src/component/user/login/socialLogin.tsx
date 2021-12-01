import {Component} from "react";
import {FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL} from "../../../constants";
import googleLogo from "../../../assets/img/google-logo.png";
import fbLogo from "../../../assets/img/fb-logo.png";

class SocialLogin extends Component<any, any> {
    render() {
        return (
            <div className="social-login">
                <p>Or connect with:</p>
                <a href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google"/>
                    Continue with Google
                </a>

                <a href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Google"/>
                    <p>Continue with Facebook</p>
                </a>
            </div>
        )
    }
}

export default SocialLogin;