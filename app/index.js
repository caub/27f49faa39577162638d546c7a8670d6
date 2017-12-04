import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './components/App';
import reducers from './util/reducers';
import {getSession} from './util/actions';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleware)
);

getSession(store.dispatch, process.env.MOCK)()
	.then(() => document.body.classList.remove('loading'));

const WrapApp = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

render(<WrapApp />, document.getElementById('root'));
