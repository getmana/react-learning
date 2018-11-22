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

	.readonly-dropdown i {
		display: none;
	}
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

const ErrorMessage = styled.div`
	color: red;
	font-size: 12px;
`;

class Dropdown extends Component {
		state = {
			currentValue: this.props.defaultProp,
			isOpen: false,
			portalStyle: portalInitStyle,
			currentList: this.props.list,
		};

	openDropdown = (coordinats) => {
		const { readOnly, } = this.props;

		if (!readOnly) {
			this.setState({
				isOpen: true,
				portalStyle: {
					...this.state.portalStyle,
					top: coordinats.bottom + 5,
					left: coordinats.left,
				},
			})
		}
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
		const { onSelect, input, } = this.props;
		const { name, } = input || {};
		this.setState({
			currentValue: item,
		})
		onSelect(item, name);
		this.closeDropdown();
	}

	render() {
		const { label, disabled, style, className, input, meta, readOnly, } = this.props;
		const { touched, error, warning, } = meta || {};
		const { isOpen, currentValue, portalStyle, currentList, } = this.state;
		const openedIcon = 'keyboard_arrow_up';
		const closedIcon = 'keyboard_arrow_down';

		return (
			<DropdownThemed>
				<Label label={label} disabled={disabled} style={style} />
				<InputBox className={className}>
					<InputElement
						value={currentValue}
						type="text"
						disabled={disabled}
						readOnly={readOnly}
						style={style}
						onChange={this.handleChange}
						onOpenDropdown={this.openDropdown}
						{...input}
					/>
					<Icon className="material-icons" disabled={disabled}>
						{
							isOpen ? openedIcon : closedIcon
						}
					</Icon>
				</InputBox>
				{isOpen && (
					<Portal portalStyle={portalStyle} onClose={this.closeDropdown}>
						<DropdownList list={currentList} onSelectVariant={this.selectVariant} />
					</Portal>
				)}
				{
					touched &&
					((error && <ErrorMessage>{error}</ErrorMessage>) ||
						(warning && <ErrorMessage>{warning}</ErrorMessage>))
				}
			</DropdownThemed>
		)
	}
}

export default Dropdown;

Dropdown.propTypes = {
	label: PropTypes.string.isRequired,
	list: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	])).isRequired,
	defaultProp: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	onSelect: PropTypes.func,
	disabled: PropTypes.bool,
}