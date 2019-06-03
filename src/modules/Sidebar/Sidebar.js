import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Title, Spinner, } from '../../components';
import { SidebarThemed, LiThemed, } from './style';

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