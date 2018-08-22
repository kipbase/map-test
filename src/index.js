import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Login from './Login'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Login username={"admin"} password={"admin"} />, document.getElementById('root'));
registerServiceWorker();
