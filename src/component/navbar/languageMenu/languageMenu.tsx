import React, {Component} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import {withTranslation} from "react-i18next";


class LanguageMenu extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            anchorMenu: null,
            menuIsOpen: false,
            localizationModalIsOpen: false
        };
    }

    render() {
        const {t, i18n} = this.props;
        const handleLocalizationMenuClick = (event: React.MouseEvent<HTMLElement>) => {
            this.setState({anchorMenu: event.currentTarget, localizationModalIsOpen: true})
        }

        const handleLocalizationClose = () => {
            this.setState({anchorMenu: null, localizationModalIsOpen: false})
        }

        const handleChangeLanguage = (language: string) => {
            this.setState({anchorMenu: null, localizationModalIsOpen: false})
            i18n.changeLanguage(language);
        }

        return <>
            <IconButton onClick={handleLocalizationMenuClick}>
                <PublicIcon style={{color: 'white'}}/>
            </IconButton>

            <Menu anchorEl={this.state.anchorMenu}
                  keepMounted
                  open={this.state.localizationModalIsOpen}
                  onClose={handleLocalizationClose}
                  PaperProps={{
                      style: {
                          maxHeight: this.props.ITEM_HEIGHT * 4.5,
                          width: '20ch',
                      },
                  }}>
                <MenuItem key="english" onClick={() => handleChangeLanguage('en')}>
                    English
                </MenuItem>
                <MenuItem key="french" onClick={() => handleChangeLanguage('fr')}>
                    Français
                </MenuItem>
                <MenuItem key="arabic" onClick={() => handleChangeLanguage('ar')}>
                    العربية
                </MenuItem>
            </Menu>
        </>
    }
}

export default withTranslation()(LanguageMenu);