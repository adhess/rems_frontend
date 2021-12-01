import {Link} from "react-router-dom";
import React, {Component, ComponentType} from 'react';
import logo from "../../assets/img/SweetHome1-300x300.png"
import {Box, Button, ButtonGroup, IconButton, Menu, MenuItem, ModalUnstyled, styled} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Login from "../user/login/login";
import {ACCESS_TOKEN} from "../../constants";
import {LOGIN_MODAL, LOGOUT} from "../../store/actions";
import "./navbar.scss";
import {compose} from "redux";
import {withRouter} from "react-router";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const ITEM_HEIGHT = 48;

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

class Navbar extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            anchorMenu: null,
            menuIsOpen: false
        };
    }

    render() {

        const handleLogout = () => {
            localStorage.removeItem(ACCESS_TOKEN);
            this.props.logout();
            this.props.history.push("/");
            this.props.enqueueSnackbar('You\'re safely logged out!', {variant: 'success'});
            handleMenuClose();
        }

        const handleOpenLoginModal = (event: React.MouseEvent<HTMLElement>) => {
            handleMenuClose();
            this.props.setLoginModal(true);
        };

        const handleOpenNotificationModal = (event: React.MouseEvent<HTMLElement>) => {
            alert("will be implemented in a future batch.")
        }

        const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
            this.setState({anchorMenu: event.currentTarget, menuIsOpen: true})
        };

        const handleMenuClose = () => {
            this.setState({anchorMenu: null, menuIsOpen: false})
        };

        const handleGoToProfile = () => {
            this.props.history.push("profile");
            handleMenuClose();
        }
        const navigate = (newRoute: string) => {
            this.props.history.push(newRoute);
        }
        return (
            <div className={['row', 'navbarMenuSections'].join(" ")} style={{width: '100%', color: 'white'}}>

                <div className="navbarNavigationsButtons">
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button onClick={() => navigate('/buy')}>Buy</Button>
                        <Button onClick={() => navigate('/rent')}>Rent</Button>
                        <Button onClick={() => navigate('/sell')}>Sell</Button>
                    </ButtonGroup>
                </div>

                <Link to="/"
                      style={{
                          display: 'flex',
                          flexDirection: 'row',
                          color: "white",
                          alignItems: "center",
                          width: "90px",
                          justifyContent: "space-between",
                          textDecoration: "none"
                      }}>
                    <img src={logo} width={30} height={30} alt="zLand"/>
                    <h3>zLand</h3>
                </Link>

                <div style={{width: "300px", display: "flex", justifyContent: "end"}}>

                    {!this.props.user ? null : <IconButton onClick={handleOpenNotificationModal}>
                        <NotificationsNoneOutlinedIcon style={{color: 'white'}}/>
                    </IconButton> }

                    {this.props.user ? null : <Button onClick={handleOpenLoginModal}>Login</Button>}

                    {!this.props.user ? null :
                        <IconButton onClick={handleMenuClick}>
                            <MoreVertIcon style={{color: "white"}}/>
                        </IconButton>
                    }
                </div>

                <Menu anchorEl={this.state.anchorMenu}
                      keepMounted
                      open={this.state.menuIsOpen}
                      onClose={handleMenuClose}
                      PaperProps={{
                          style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: '20ch',
                          },
                      }}>
                    <MenuItem key="profile" onClick={handleGoToProfile}>
                        Profile
                    </MenuItem>
                    <MenuItem key="logout" onClick={handleLogout}>
                        Logout
                    </MenuItem>
                </Menu>

                <StyledModal open={this.props.loginModal}
                             onClose={() => this.props.setLoginModal(false)}
                             BackdropComponent={Backdrop}>
                    <Box sx={style}>
                        <Login/>
                    </Box>
                </StyledModal>
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

export default compose<ComponentType>(withRouter, withSnackbar, connect(mapStateToProps, mapDispatchToProps))(Navbar);