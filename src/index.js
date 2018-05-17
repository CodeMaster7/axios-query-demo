import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.css';
import { HashRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router onUpdate={() => window.scrollTo(0, 0)}  ><App /></Router>, document.getElementById('root'));
registerServiceWorker();
