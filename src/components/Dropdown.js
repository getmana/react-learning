import React, { Component, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DropdownList from './DropdownList';
import Label from './Label';
import InputElement from './InputElement';
import Portal from './Portal';

const DropdownThemed = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 300px;
	padding: 20px 10px;
	box-sizing: border-box;
	color: ${props => props.theme.primary};
	position: relative;
`;

const InputBox = styled.div`
	width: 100%;
	display: flex;
`;

const Icon = styled.i`
	color: ${props => props.disabled ? props.theme.unactive : props.theme.primary};
`;

const portalInitStyle = {
	position: 'fixed',
	zIndex: '10',
	fontFamily: 'Roboto, sans-serif',
	width: '280px',
};

class Dropdown extends Component {
		state = {
			currentValue: this.props.defaultProp,
			isOpen: false,
			style: portalInitStyle,
			currentList: this.props.list,
		};

	openDropdown = (coordinats) => {
		this.setState({
			isOpen: true,
			style: {
				...this.state.style,
				top: coordinats.bottom + 5,
				left: coordinats.left,
			},
		})
	}

	closeDropdown = () => {
		this.setState({
			isOpen: false,
		})
	}

	handleChange = (e) => {
		const { list, } = this.props;
		this.setState({
			currentValue: e.target.value,
		})
		let filter = e.target.value.toLowerCase();
		const resultList = list.filter((item) => {
			return item.toLowerCase().indexOf(filter) === 0;
		})
		this.setState({
			currentList: filter === '' ? list : resultList,
		})
	}

	selectVariant = (item) => {
		const { onSelect, } = this.props;
		this.setState({
			currentValue: item,
		})
		onSelect(item);
		this.closeDropdown();
	}

	render() {
		const { label, disabled, } = this.props;
		const { isOpen, currentValue, style, currentList, } = this.state;
		const openedIcon = 'keyboard_arrow_up';
		const closedIcon = 'keyboard_arrow_down';

		return (
			<DropdownThemed>
				<Label label={label} disabled={disabled} />
				<InputBox>
					<InputElement
						value={currentValue}
						type="text"
						disabled={disabled}
						onChange={this.handleChange}
						onOpenDropdown={this.openDropdown}
					/>
					<Icon className="material-icons" disabled={disabled}>
						{
							isOpen ? openedIcon : closedIcon
						}
					</Icon>
				</InputBox>
				{isOpen && (
					<Portal portalStyle={style} onClose={this.closeDropdown}>
						<DropdownList list={currentList} onSelectVariant={this.selectVariant} />
					</Portal>
				)}
			</DropdownThemed>
		)
	}
}

export default Dropdown;

Dropdown.propTypes = {
	label: PropTypes.string.isRequired,
	list: PropTypes.arrayOf(PropTypes.string).isRequired,
	defaultProp: PropTypes.string,
	onSelect: PropTypes.func,
	disabled: PropTypes.bool,
}