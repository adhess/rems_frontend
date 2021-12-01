import {Component} from "react";
import {connect} from "react-redux";

class Home extends Component<any, any> {
    render() {
        return <div className="homePage">
            <div className="homeText">
                <h2>Invest In Your Future</h2>
                <h2>Invest With Us</h2>
                <p>Find your next home through the most trusted and reliable real estate management system.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);