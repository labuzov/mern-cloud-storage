import { connect } from "react-redux";
import Header from "./header/Header";
import { getUserData } from "../redux/reducers/userReducer";
import { Redirect, Route, Switch } from "react-router";
import Registration from "./auth/registration/Registration";
import Login from "./auth/login/Login";
import { useEffect } from "react";
import { initializeApp } from "../redux/reducers/appReducer";
import Preloader from "./loader/Preloader";
import Content from "./content/Content";



function App(props) {

    useEffect(() => {
        props.initializeApp();
    }, [])

    if (!props.initialized) return <Preloader />

    return (
        <>
            <Header />

            {!props.isAuth ?
                <Switch>
                    <Route path="/registration" render={() =>
                        <Registration />
                    } />

                    <Route path="/login" render={() =>
                        <Login />
                    } />

                    <Redirect to="/login" />
                </Switch>
                :
                <Content />
                
            }
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        initialized: state.app.initialized,
    }
}


export default connect(mapStateToProps, {
    getUserData, initializeApp, 
})(App);
