import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import includeVendorScripts from './includeVendorScripts';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
includeVendorScripts();
