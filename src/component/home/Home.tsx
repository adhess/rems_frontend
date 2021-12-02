import {Component, ComponentType} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withTranslation} from "react-i18next";

class Home extends Component<any, any> {
    render() {
        const {t} = this.props;
        return <div className="homePage">
            <div className="homeText">
                <h2>{t('Invest In Your Future')}</h2>
                <h2>{t('Invest With Us')}</h2>
                <p>{t('Find your next home through the most trusted and reliable real estate management system.')}</p>
            </div>
        </div>
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {}
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        test: state.test
    }
}

export default compose<ComponentType>(withTranslation(), connect(mapStateToProps, mapDispatchToProps))(Home);