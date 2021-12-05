import React, {Component} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ACCESS_TOKEN} from "../../../constants";
import {withTranslation} from "react-i18next";
import {compose} from "redux";
import {withRouter} from "react-router";

class MenuModal extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            anchorMenu: null,
            menuIsOpen: false,
        };
    }

    render() {
        const {t} = this.props;

        const handleMenuClose = () => {
            this.setState({anchorMenu: null, menuIsOpen: false})
        };

        const handleLogout = () => {
            localStorage.removeItem(ACCESS_TOKEN);
            this.props.logout();
            this.props.history.push("/");
            this.props.enqueueSnackbar('You\'re safely logged out!', {variant: 'success'});
            handleMenuClose();
        }

        const handleGoToProfile = () => {
            this.props.history.push("profile");
            handleMenuClose();
        }

        const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
            this.setState({anchorMenu: event.currentTarget, menuIsOpen: true})
        };

        return <>
            <IconButton onClick={handleMenuClick}>
                <MoreVertIcon style={{color: "white"}}/>
            </IconButton>

            <Menu anchorEl={this.state.anchorMenu}
                  keepMounted
                  open={this.state.menuIsOpen}
                  onClose={handleMenuClose}
                  PaperProps={{
                      style: {
                          maxHeight: this.props.ITEM_HEIGHT * 4.5,
                          width: '20ch',
                      },
                  }}
            >
                <MenuItem key="profile" onClick={handleGoToProfile}>
                    {t('Profile')}
                </MenuItem>
                <MenuItem key="logout" onClick={handleLogout}>
                    {t('Logout')}
                </MenuItem>
            </Menu>
        </>;
    }
}

export default compose<any>(withTranslation(), withRouter)(MenuModal);