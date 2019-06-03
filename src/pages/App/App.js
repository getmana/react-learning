import React, { Component, } from 'react';
import { withRouter, } from 'react-router-dom';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProvider, } from 'styled-components';
import { closeMessageModal, } from '../../store/models/messageModal';
import { themeIndigo, themeOrange, } from '../../configs/themes';
import { Header, Footer, MainSection, Portal, } from '../../components';
import { CenteredModal, MessageModal, SelectThemeModal, Sidebar, ContentSwitch, } from '../../modules';
import { Page, portalInitStyle, } from './style';

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
					<Header />
					<MainSection>
						<Sidebar onOpenModal={this.openModal} />
						<ContentSwitch />
					</MainSection>
					<Footer />
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