const fetch = require('node-fetch');


console.log(fetch === window.fetch);

// import React from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import App from './components/App';
// import reducers, { SIGNIN, TOGGLE_MODE } from './util/reducers';
// import fetchApi from './util/fetchApi';

// const store = createStore(reducers, { mode: 'search', zones: [] });

// document.body.classList.remove('loading');

// document.addEventListener('keydown', e => { // cancel timezone add mode on Esc
// 	if (e.key === 'Escape') {
// 		if (store.getState().mode === 'add') {
// 			store.dispatch({ type: TOGGLE_MODE, value: 'search' });
// 		}
// 	}
// });

// fetchApi('user')
// 	.then(user => {
// 		store.dispatch({ type: SIGNIN, value: user });
// 	})
// 	.catch(() => {});

// const WrapApp = () => (
// 	<Provider store={store}>
// 		<App />
// 	</Provider>
// );

// render(<WrapApp />, document.getElementById('root'));
