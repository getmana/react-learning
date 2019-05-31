import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Title, Spinner, } from '../../components';
import styled from 'styled-components';

const SidebarThemed = styled.aside`
	flex: none;
	display: flex;
	flex-direction: column;
	min-width: 250px;
	padding: 20px;
`;

const LiThemed = styled.li`
	padding: 5px 20px;

	a {
		color: ${props => props.theme.primary};
	}

	a:hover {
		color: ${props => props.theme.secondary};
	}

`;

export default class Sidebar extends Component {
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
				<Button style="primary" onClick={onOpenModal}>Change Theme</Button>
				<Title>Menu</Title>
				<ul>
					<LiThemed>
						<Link to="/">Home Page</Link>
					</LiThemed>
					<LiThemed>
						<Link to="/login">Login Page</Link>
					</LiThemed>
					<LiThemed>
						<Link to="/books">Books</Link>
					</LiThemed>
					<LiThemed>
						<Link to="/buy-books">Buy Books</Link>
					</LiThemed>
				</ul>
				<Title>Nice Buttons</Title>
				<Button>I'm Default Button</Button>
				<Button style="primary" loading={loading} onClick={this.handleClick}>I'm Primary Button</Button>
				<Button style="secondary" >I'm Secondary Button</Button>
				<Button style="secondary" disabled={disabled}>I'm Disabled Button</Button>
				<Title>Nice Spinner</Title>
				<Spinner size="26px" />
			</SidebarThemed>
		)
	}
}

Sidebar.propTypes = {
	onOpenModal: PropTypes.func.isRequired,
}