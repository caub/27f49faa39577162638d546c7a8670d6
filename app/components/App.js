import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Header from './Header';
import Main from './Main';
import Signin from './Signin';

const Screen = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100vh;
`;

export const AppView = ({session}) => (
	<Screen>
		{session ? (
			<>
				<Header />
				<Main />
			</>
		) : (
			<Signin />
		)}
	</Screen>
);

const mapStateToProps = (state, _p) => state;

const App = connect(mapStateToProps)(AppView);

export default App;
