import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.css';
import App from  './components/app'
import {Router} from 'react-router-dom'
import {history} from "./history";
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<Router history={history}><App /></Router>, document.getElementById('root'));
registerServiceWorker();
