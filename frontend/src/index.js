import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import registerServiceWorker from './registerServiceWorker';
import './css/bootstrap-4.0.0-beta-dist/css/bootstrap.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
