import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from './Root';
import App from './components/App';
import { baseURL } from './routes';
import '../scss/styles.scss';

ReactDOM.render(
    <Root>
        <BrowserRouter>
            <Route path={baseURL} component={App} />
        </BrowserRouter>
    </Root>,
    document.querySelector('#root')
);