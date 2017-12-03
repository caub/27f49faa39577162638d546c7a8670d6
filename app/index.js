import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './components/App';
import reducers, {getSession} from './util/reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleware)
);

document.body.classList.remove('loading');

getSession(store.dispatch, process.env.MOCK)();

const WrapApp = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

render(<WrapApp />, document.getElementById('root'));
