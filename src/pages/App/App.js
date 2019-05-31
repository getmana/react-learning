import React, { Component, } from 'react';
import { Link, Route, Switch, withRouter, } from 'react-router-dom';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProvider, } from 'styled-components';
import { closeMessageModal, } from '../../store/models/messageModal';
import Logo from '../../assets/images/react-logo.png';
import { themeIndigo, themeOrange, } from '../../configs/themes';
import { Header, Footer, MainSection, Portal, } from '../../components';
import { CenteredModal, MessageModal, SelectThemeModal, Sidebar, } from '../../modules';
import { Account, HomePage, Login, Books, SingleBook, BuyBooks, } from '../../pages';
import { Page, HeaderTitle, LogoImage, LinkBox, portalInitStyle, } from './style';

const mapStateToProps = (state) => {
	return ({
		message: state.messageModal.message,
		title: state.messageModal.title,
	})
}

const mapDispatchToProps = (dispatch) => ({
	closeMessageModal: () => dispatch(closeMessageModal()),
})

@withRouter

@connect(
	mapStateToProps,
	mapDispatchToProps,
)

export default class App extends Component {
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
							<Route path="/buy-books" component={BuyBooks} />
						</Switch>
					</MainSection>
					<Footer>
						<p>I'm a small footer &copy; 2019</p>
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

App.propTypes = {
	message: PropTypes.string,
	title: PropTypes.string,
	closeMessageModal: PropTypes.func,
}
App.defaultProps = {
	message: '',
	title: '',
}