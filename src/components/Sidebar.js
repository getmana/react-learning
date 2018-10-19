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
	}

	handleClick = () => {
		this.setState({
			loading: true,
		})
	}

	render() {
		const { loading, } = this.state;
		const { onOpenModal, } = this.props;

		return (
			<SidebarThemed>
				<Title>Change the Theme</Title>
				<Button btnType="primary" onClick={onOpenModal}>Change Theme</Button>
				<Title>Nice Buttons</Title>
				<Button btnType="primary" loading={loading} onClick={this.handleClick}>I'm Button</Button>
				<Button btnType="secondary">I'm Secondary Button</Button>
				<Button btnType="unactive">I'm Unactive Button</Button>
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