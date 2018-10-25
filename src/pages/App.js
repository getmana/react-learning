import React, { Component, Fragment, } from 'react';
import { Link, Route, Switch, } from 'react-router-dom';
import styled, { ThemeProvider, } from 'styled-components';
import Logo from '../images/react-logo.png';
import { themeIndigo, themeOrange, } from '../configs/themes';
import { Header, Footer, MainSection, Portal, SelectThemeModal, Sidebar, Content, } from '../components';
import Login from './Login';
import Account from './Account';

const Page = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	box-sizing: border-box;
	font-family: 'Roboto', sans-serif;
`;

const HeaderTitle = styled.h1`
    font-size: 36px;
    padding-top: 5px;
`;

const LogoImage = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;

const LinkBox = styled.div`
	position: absolute;
	padding: 15px 20px;
	right: 0;

	a {
		color: #fff;
	}

	@media screen and (max-width: 480px) {
		position: relative;
	}
`;

const portalInitStyle = {
	position: 'fixed',
	zIndex: '10',
	fontFamily: 'Roboto, sans-serif',
	width: '40%',
	height: '40vh',
	top: '30vh',
	left: '30%',
};

class App extends Component {
	state = {
		modalIsOpen: false,
		themeName: themeOrange,
		style: portalInitStyle,
	}

	openModal = () => {
		this.setState({
			modalIsOpen: true,
		})
	}

	closeModal = () => {
		this.setState({
			modalIsOpen: false,
		})
	}

	handleChange = (currentName) => {
		let themeName = themeOrange;

		if (currentName === 'indigo') {
			themeName = themeIndigo;
		}
		this.setState({
			themeName,
		})
	}

	render() {
		const { modalIsOpen, themeName, style, } = this.state;

		return (
			<ThemeProvider theme={themeName}>
				<Page>
					<Header>
						<Link to="/"><LogoImage src={Logo} /></Link>
						<HeaderTitle>Hello from React</HeaderTitle>
						<LinkBox>
							<Link to="login">login</Link>
						</LinkBox>
					</Header>
					<MainSection>
						<Switch>
							<Route
								exact
								path="/"
								render={() => (
									<Fragment>
										<Sidebar onOpenModal={this.openModal} />
										<Content />
									</Fragment>
								)}
							/>
							<Route path="/login" render={() => <Login />} />
							<Route path="/account" render={() => <Account />} />
						</Switch>
					</MainSection>
					<Footer>
						<p>I'm a small footer &copy; 2018</p>
					</Footer>
					{modalIsOpen && (
						<Portal portalStyle={style} onClose={this.closeModal}>
							<SelectThemeModal
								theme={themeName}
								selectTheme={this.handleChange}
								onClose={this.closeModal}
							/>
						</Portal>
					)}
				</Page>
			</ThemeProvider>
		)
	}
}

export default App;