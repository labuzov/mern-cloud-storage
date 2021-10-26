import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import store from './redux/store';
import { Provider } from 'react-redux';
import './index.scss';
import './vars.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>    
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);


reportWebVitals();
