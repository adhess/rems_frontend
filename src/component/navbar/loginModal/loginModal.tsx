import React, {Component, ComponentType} from "react";
import {Box, Button, ModalUnstyled, styled} from "@mui/material";
import Login from "../../user/login/login";
import {LOGIN_MODAL, LOGOUT} from "../../../store/actions";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";

class LoginModal extends Component<any, any> {


    render() {
        const {t} = this.props;
        const StyledModal = styled(ModalUnstyled)`
          position: fixed;
          z-index: 1300;
          right: 0;
          bottom: 0;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        `;

        const Backdrop = styled('div')`
          z-index: -1;
          position: fixed;
          right: 0;
          bottom: 0;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          -webkit-tap-highlight-color: transparent;
        `;

        const style = {
            width: 330,
            bgcolor: 'background.paper',
            borderRadius: '6px',
            p: 2,
            px: 4,
            pb: 3,
        };
        const handleOpenLoginModal = () => {
            handleMenuClose();
            this.props.setLoginModal(true);
        };

        const handleMenuClose = () => {
            this.setState({anchorMenu: null, menuIsOpen: false})
        };

        return (
            <>
                <Button onClick={handleOpenLoginModal}>{t('Login')}</Button>

                <StyledModal open={this.props.loginModal}
                             onClose={() => this.props.setLoginModal(false)}
                             BackdropComponent={Backdrop}>
                    <Box sx={style}>
                        <Login/>
                    </Box>
                </StyledModal>
            </>
        );
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

export default compose<ComponentType>(withTranslation(), withRouter, withSnackbar, connect(mapStateToProps, mapDispatchToProps))(LoginModal);