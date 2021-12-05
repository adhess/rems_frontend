import {Link} from "react-router-dom";
import React, {Component, ComponentType} from 'react';
import logo from "../../assets/img/SweetHome1-300x300.png"
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {LOGIN_MODAL, LOGOUT} from "../../store/actions";
import "./navbar.scss";
import {compose} from "redux";
import {withRouter} from "react-router";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {withTranslation} from "react-i18next";
import LanguageMenu from "./languageModal/languageModal";
import LoginModal from "./loginModal/loginModal";
import MenuModal from "./menuModal/menuModal";

const ITEM_HEIGHT = 48;

class Navbar extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            anchorMenu: null,
            menuIsOpen: false,
        };
    }

    render() {
        const {t} = this.props;

        const handleOpenNotificationModal = () => {
            alert("will be implemented in a future batch.")
        }

        const navigate = (newRoute: string) => {
            this.props.history.push(newRoute);
        }

        return (
            <div className='navbarMenuSections' style={{width: '100%'}}>
                <div className='row'>
                    <Link to="/" className="logoSection">
                        <img src={logo} width={30} height={30} alt="ZLand"/>
                        <h3>ZLand</h3>
                    </Link>

                    <div className="navbarNavigationsButtons">
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button onClick={() => navigate('/buy')}>{t('Buy')}</Button>
                            <Button onClick={() => navigate('/rent')}>{t('Rent')}</Button>
                            <Button onClick={() => navigate('/sell')}>{t('Sell')}</Button>
                        </ButtonGroup>
                    </div>

                    <div style={{width: "300px", display: "flex", justifyContent: "end"}}>
                        <LanguageMenu ITEM_HEIGHT={ITEM_HEIGHT}/>

                        {!this.props.user ? null : <IconButton onClick={handleOpenNotificationModal}>
                            <NotificationsNoneOutlinedIcon style={{color: 'white'}}/>
                        </IconButton>}

                        {this.props.user ? null : <LoginModal/>}

                        {!this.props.user ? null : <MenuModal ITEM_HEIGHT={ITEM_HEIGHT}/>}
                    </div>
                </div>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch({type: LOGOUT}),
        setLoginModal: (val: any) => dispatch({type: LOGIN_MODAL, value: val})
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        loginModal: state.loginModal
    }
}

export default compose<ComponentType>(withTranslation(), withRouter, withSnackbar, connect(mapStateToProps, mapDispatchToProps))(Navbar);