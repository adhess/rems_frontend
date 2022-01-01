import React, {Component} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import {withTranslation} from "react-i18next";
import TranslateIcon from '@mui/icons-material/Translate';


class LanguageModal extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            anchorMenu: null,
            localizationModalIsOpen: false
        };
    }

    render() {
        const {i18n} = this.props;
        const handleLocalizationMenuClick = (event: React.MouseEvent<HTMLElement>) => {
            this.setState({anchorMenu: event.currentTarget, localizationModalIsOpen: true})
        }

        const handleLocalizationClose = () => {
            this.setState({anchorMenu: null, localizationModalIsOpen: false})
        }

        const handleChangeLanguage = (language: string) => {
            this.setState({anchorMenu: null, localizationModalIsOpen: false})
            i18n.changeLanguage(language);

            if (language === 'ar') {
                document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
            } else {
                document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
            }
        }

        return <>
            <IconButton onClick={handleLocalizationMenuClick}>
                <TranslateIcon style={{color: 'white'}}/>
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

export default withTranslation()(LanguageModal);