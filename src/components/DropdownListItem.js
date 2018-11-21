import React, { Component, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ItemThemed = styled.li`
	padding: 0.4em 1em;
	cursor: pointer;

	:hover {
		background-color: ${props => props.theme.unactive};
	}
`;

class DropdownListItem extends Component {
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

export default DropdownListItem;

DropdownListItem.propTypes = {
	item: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	onSelectVariant: PropTypes.func.isRequired,
}