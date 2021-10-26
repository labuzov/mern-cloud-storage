import { NavLink, Redirect } from 'react-router-dom';
import './registration.scss';
import '../auth.scss';
import { connect } from 'react-redux';
import { createNewUser } from '../../../redux/reducers/userReducer';
import { useState } from 'react';


const Registration = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (props.isAuth) return <Redirect to="/"/>

    return (
        <div className="auth">
            <div className="auth__inner">
                <div className="auth__title">Registration</div>
                <div className="auth__subtitle">Enter your E-Mail and Password</div>

                <div className="auth__input">
                    <input 
                    type="text" 
                    className="auth__input-area" 
                    name="email"
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
                    onChange={(e) => setPassword(e.currentTarget.value)} />
                    <label className="auth__label">Password</label>
                </div>

                <div className="auth__input">
                    <input type="password" className="auth__input-area" />
                    <label className="auth__label">Repeat the password</label>
                </div>

                <div className="auth__buttons">
                    <NavLink to="/login" className="auth__btn auth__register">Hava an Account?</NavLink>
                    <button 
                    className="auth__btn auth__submit" 
                    onClick={() => props.createNewUser(email, password)} >Create</button>
                </div>

            </div>
        </div>
    )
}



const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})



export default connect(mapStateToProps, {createNewUser})(Registration)