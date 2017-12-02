import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Main from './Main';
import Signin from './Signin';

export const AppView = ({session}) => (
	<div>
		{session ? (
			<>
				<Header />
				<Main />
			</>
		) : (
			<Signin />
		)}
	</div>
);

const mapStateToProps = (state, _p) => state;

const App = connect(mapStateToProps)(AppView);

export default App;
