import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './login.scss';
import '../auth.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { getUserData } from '../../../redux/reducers/userReducer';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (props.isAuth) return <Redirect to="/"/>

    return (
        <div className="auth">
            <div className="auth__inner">
                <div className="auth__title">Sign In</div>
                <div className="auth__subtitle">Enter your E-Mail and Password</div>

                <div className="auth__input">
                    <input 
                    type="text" 
                    className="auth__input-area" 
                    name=""
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)} />
                    <label className="auth__label">Enter your E-Mail</label>
                </div>

                <div className="auth__input">
                    <input 
                    type="password" 
                    className="auth__input-area" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}/>
                    <label className="auth__label">Password</label>
                </div>

                <div className="auth__buttons">
                    <NavLink to="/registration" className="auth__btn auth__register">Registration</NavLink>
                    <button className="auth__btn auth__submit" onClick={() => props.getUserData(email, password)}>Join</button>
                </div>

            </div>
        </div>
    )
}



const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {getUserData})(Login)