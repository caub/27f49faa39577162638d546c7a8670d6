import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './components/App';
import reducers, {getSession} from './util/reducers';

const store = createStore(reducers, { mode: 'search', zones: [] });

document.body.classList.remove('loading');

getSession(store.dispatch)();

const WrapApp = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

render(<WrapApp />, document.getElementById('root'));
