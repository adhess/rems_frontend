import {Component, ComponentType} from "react";
import {getCurrentUser, login, signup} from "../../../../utils/APIUtils";
import {ACCESS_TOKEN} from "../../../../constants";
import {Button, Tab, Tabs, TextField} from "@mui/material";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router";
import {compose} from "redux";
import {connect} from "react-redux";
import './loginForm.scss'
import {LOGIN, LOGIN_MODAL} from "../../../../store/actions";
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import {Trans, withTranslation} from "react-i18next";

class LoginForm extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tabIndex: 0,
            email: '',
            password: '',
            name: '',
            isWeekPassword: false,
            isWrongEmail: false,
            emailHelperText: '',
            passwordHelperText: ''
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleInputChange(event: any) {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        this.setState({[inputName]: inputValue});
    }

    handleLogin(event: any) {
        event.preventDefault();

        if (this.isValidForm()) {
            const loginRequest = {email: this.state.email, password: this.state.password};

            login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                    this.props.setLoginModal(false);
                    getCurrentUser()
                        .then(user => {
                            this.props.login(user.data);
                        })
                        .catch(() => {
                            this.props.enqueueSnackbar("Oops! Something went wrong. Please try again!", {variant: 'error'});
                        });
                    this.props.enqueueSnackbar("You're successfully logged in!", {variant: 'success'});
                })
                .catch(() => {
                    this.props.enqueueSnackbar("Oops! Something went wrong. Please try again!", {variant: 'error'});
                });
        }

    }

    handleSignup(event: any) {
        event.preventDefault();

        const sigInRequest = {email: this.state.email, password: this.state.password, name: this.state.name};


        if (this.isValidForm()) {
            signup(sigInRequest)
                .then(() => {
                    this.props.enqueueSnackbar("You're successfully registered. Please login to continue!", {variant: 'success'});
                    this.handleTabChange(undefined, 0);
                })
                .catch(() => {
                    this.props.enqueueSnackbar("Oops! Something went wrong. Please try again!", {variant: 'error'});
                })
        }
    }

    handleForgetPassword(event: any) {
        event.preventDefault();
        alert("Will be implemented in a future batch!");
    }

    tabsProps = (index: number) => ({
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    });

    handleTabChange = (event: React.SyntheticEvent | undefined, newValue: number) => {
        this.setState({
            tabIndex: newValue,
            name: '',
            email: '',
            password: '',
            isWeekPassword: false,
            isWrongEmail: false,
            emailHelperText: '',
            passwordHelperText: ''
        });
    };

    render() {
        const {t} = this.props;
        return (
            <div>
                <Tabs value={this.state.tabIndex} onChange={this.handleTabChange}>
                    <Tab label={t("Sign in")} {...this.tabsProps(0)} />
                    <Tab label={t("New account")} {...this.tabsProps(1)} />
                </Tabs>

                <TabPanel value={this.state.tabIndex} index={0}>
                    <h4 style={{margin: "1.5em 0 0 0"}}>{t('Email')}</h4>
                    <TextField fullWidth size="small" variant="outlined" style={{marginBottom: "1.5em"}}
                               name="email"
                               value={this.state.email}
                               error={this.state.isWrongEmail}
                               helperText={this.state.emailHelperText}
                               onChange={this.handleInputChange}/>

                    <h4 style={{margin: "0"}}>{t('Password')}</h4>
                    <TextField fullWidth size="small" variant="outlined" style={{marginBottom: "1.5em"}}
                               type="password"
                               name="password"
                               value={this.state.password}
                               error={this.state.isWeekPassword}
                               helperText={this.state.passwordHelperText}
                               onChange={this.handleInputChange}/>

                    <Button fullWidth variant="contained" onClick={this.handleLogin.bind(this)}>{t('Sign in')}</Button>
                    <button className="forgetYourPasswordText" onClick={this.handleForgetPassword.bind(this)}>{t('Forget your password?')}</button>
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={1}>
                    <h4 style={{margin: "1.5em 0 0 0"}}>{t('FullName')}</h4>
                    <TextField fullWidth size="small" variant="outlined"
                               type="text"
                               name="name"
                               value={this.state.name}
                               autoComplete="uname"
                               onChange={this.handleInputChange}/>

                    <h4 style={{margin: "1.5em 0 0 0"}}>{t('Email')}</h4>
                    <TextField fullWidth size="small" variant="outlined" style={{marginBottom: "1.5em"}}
                               name="email"
                               value={this.state.email}
                               error={this.state.isWrongEmail}
                               helperText={this.state.emailHelperText}
                               onChange={this.handleInputChange}/>

                    <h4 style={{margin: "0"}}>{t('Password')}</h4>
                    <TextField fullWidth size="small" variant="outlined" style={{marginBottom: "1.5em"}}
                               type="password"
                               name="password"
                               value={this.state.password}
                               error={this.state.isWeekPassword}
                               helperText={this.state.passwordHelperText}
                               onChange={this.handleInputChange}/>

                    <Button fullWidth variant="contained" onClick={this.handleSignup.bind(this)}>{t('Submit')}</Button>
                </TabPanel>
            </div>
        )
    }

    private isValidForm() {
        const isWrongEmail = !isEmail(this.state.email);
        const isWeekPassword = !isStrongPassword(this.state.password);
        const emailHelperText = isWrongEmail ? <Trans>Wrong Email Format</Trans> : "";
        const passwordHelperText = isWeekPassword ? <Trans i18nKey="passwordHelperText">
            Password should include: <br/>
            At least 8 characters <br/>
            At least 1 special character <br/>
            Mix of letters and numbers <br/>
            At least 1 lowercase letter and 1 uppercase letter <br/>
        </Trans> : "";
        if (isWrongEmail || isWeekPassword) {
            this.setState({isWrongEmail, emailHelperText, isWeekPassword, passwordHelperText});
            return false;
        }
        return true;
    }
}

class TabPanel extends Component<any, any> {
    render() {
        const {children, value, index, ...other} = this.props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {children}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (user: any) => dispatch({type: LOGIN, user: user}),
        setLoginModal: (val: any) => dispatch({type: LOGIN_MODAL, value: val})
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}
export default compose<ComponentType>(withTranslation(), withRouter, withSnackbar, connect(mapStateToProps, mapDispatchToProps))(LoginForm);