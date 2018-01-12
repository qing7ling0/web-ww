'use strict'

require('babel-register');
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import ConfigureStore from './ConfigureStore';
const store = ConfigureStore(); //获取store
injectTapEventPlugin();

ReactDOM.render( 
    <Provider store = { store } >
        <LocaleProvider locale={zhCN}>
            <App />
        </LocaleProvider>
    </Provider>, 
document.getElementById('root'));