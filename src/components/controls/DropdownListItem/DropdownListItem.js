import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { ItemThemed, } from './style';

export default class DropdownListItem extends Component {
	handleClick = () => {
		const { item, onSelectVariant, } = this.props;
		onSelectVariant(item);
	}

	render() {
		const { item, } = this.props;

		return (
			<ItemThemed onClick={this.handleClick}>
				{item}
			</ItemThemed>

		)
	}
}

DropdownListItem.propTypes = {
	item: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	onSelectVariant: PropTypes.func.isRequired,
}