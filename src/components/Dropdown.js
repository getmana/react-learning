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
	constructor(props) {
		super(props);
		this.state = {
			currentValue: props.defaultProp,
			isOpen: false,
			style: portalInitStyle,
		};
	}

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

	handleChange = () => {

	}

	selectVariant = (index) => {
		const { list, onSelect, } = this.props;
		this.setState({
			currentValue: list[index],
		})
		onSelect(list[index]);
		this.closeDropdown();
	}

	render() {
		const { label, list, disabled, } = this.props;
		const { isOpen, currentValue, style, } = this.state;
		const openedIcon = 'keyboard_arrow_up';
		const closedIcon = 'keyboard_arrow_down';

		return (
			<DropdownThemed>
				<Label label={label} disabled={disabled} />
				<InputBox>
					<InputElement
						value={currentValue || 'Select'}
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
						<DropdownList list={list} onSelectVariant={this.selectVariant} />
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