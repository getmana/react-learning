import React, { Component, } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainSection from '../components/MainSection';
import { themeIndigo, themeOrange, } from '../configs/themes';
import Portal from '../components/Portal';
import SelectThemeModal from '../components/SelectThemeModal.js';
import styled, { ThemeProvider, } from 'styled-components';

const Page = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	box-sizing: border-box;
	font-family: 'Roboto', sans-serif;
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
					<Header />
					<MainSection onOpenModal={this.openModal} />
					<Footer />
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