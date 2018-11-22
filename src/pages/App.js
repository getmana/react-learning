import React, { Component, } from 'react';
import { Link, Route, Switch, withRouter, } from 'react-router-dom';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, } from 'styled-components';
import { closeMessageModal, } from '../store/models/messageModal';
import Logo from '../images/react-logo.png';
import { themeIndigo, themeOrange, } from '../configs/themes';
import { Header, Footer, MainSection, Portal, SelectThemeModal, Sidebar, CenteredModal, MessageModal, } from '../components';
import HomePage from './HomePage';
import Login from './Login';
import Account from './Account';
import Books from './Books';
import SingleBook from './SingleBook';

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

export class App extends Component {
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

	closeMessageModal = () => {
		this.props.closeMessageModal();
	}

	render() {
		const { modalIsOpen, themeName, style, } = this.state;
		const { message, title, } = this.props;

		return (
			<ThemeProvider theme={themeName}>
				<Page>
					<Header>
						<Link to="/"><LogoImage src={Logo} /></Link>
						<HeaderTitle>Hello from React</HeaderTitle>
						<LinkBox>
							<Link to="/login">login</Link>
						</LinkBox>
					</Header>
					<MainSection>
						<Sidebar onOpenModal={this.openModal} />
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route path="/login" component={Login} />
							<Route path="/account" component={Account} />
							<Route path="/search/:params" component={Books} />
							<Route path="/books" component={Books} />
							<Route path="/book/:id" component={SingleBook} />
						</Switch>
					</MainSection>
					<Footer>
						<p>I'm a small footer &copy; 2018</p>
					</Footer>
					{modalIsOpen && (
						<Portal portalStyle={style} onClose={this.closeModal}>
							<CenteredModal title="Select The Theme">
								<SelectThemeModal
									theme={themeName}
									selectTheme={this.handleChange}
									onClose={this.closeModal}
								/>
							</CenteredModal>
						</Portal>
					)}
					{message && (
						<MessageModal title={title} info={message} onClose={this.closeMessageModal} />
					)}
				</Page>
			</ThemeProvider>
		)
	}
}

// export default App;
App.propTypes = {
	message: PropTypes.string,
	title: PropTypes.string,
	closeMessageModal: PropTypes.func.isRequired,
}
App.defaultProps = {
	message: '',
	title: '',
}

const mapStateToProps = (state) => {
	return ({
		message: state.messageModal.message,
		title: state.messageModal.title,
	})
}

const mapDispatchToProps = (dispatch) => ({
	closeMessageModal: () => dispatch(closeMessageModal()),
})

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(App));