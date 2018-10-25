import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Title from './Title';
import Spinner from './Spinner';
import styled from 'styled-components';

const SidebarThemed = styled.aside`
	flex: none;
	display: flex;
	flex-direction: column;
	min-width: 250px;
	padding: 20px;
`;

class Sidebar extends Component {
	state = {
		loading: false,
		disabled: true,
	}

	handleClick = () => {
		this.setState({
			loading: true,
		})
	}

	render() {
		const { loading, disabled, } = this.state;
		const { onOpenModal, } = this.props;

		return (
			<SidebarThemed>
				<Title>Change the Theme</Title>
				<Button type="button" styles="primary" onClick={onOpenModal}>Change Theme</Button>
				<Title>Nice Buttons</Title>
				<Button>I'm Default Button</Button>
				<Button type="button" styles="primary" loading={loading} onClick={this.handleClick}>I'm Primary Button</Button>
				<Button type="button" styles="secondary" >I'm Secondary Button</Button>
				<Button type="button" styles="secondary" disabled={disabled}>I'm Disabled Button</Button>
				<Title>Nice Spinner</Title>
				<Spinner size="26px" />
			</SidebarThemed>
		)
	}
}

export default Sidebar;

Sidebar.propTypes = {
	onOpenModal: PropTypes.func.isRequired,
}