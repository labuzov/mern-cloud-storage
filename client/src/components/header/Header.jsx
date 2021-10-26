import './header.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from '../../redux/reducers/userReducer';

const Header = (props) => {
    const logout = () => {
        props.userLogout();

        localStorage.removeItem('token');
    }

    return (
        <div className="navbar">
            <div className="container navbar__container">
                <div className="navbar__logo">
                    <NavLink to="/" className="navbar__logo-link">MyCloud</NavLink>
                </div>
                <div className="navbar__buttons">
                    {!props.isAuth &&
                    <>
                        <NavLink to="/login" className="navbar__btn navbar__login">Sign In</NavLink>
                        <NavLink to="/registration" className="navbar__btn navbar__register">Create A New Account</NavLink>
                    </>
                    }
                    {props.isAuth && 
                    <> 
                        <div>{props.email}</div>
                        <button 
                        className="navbar__btn navbar__login"
                        onClick={logout}>Exit</button>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    email: state.auth.user.email,
})

export default connect(mapStateToProps, {userLogout})(Header)