import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Label, InputElement, Portal, DropdownList, } from '../../components';
import { DropdownThemed, InputBox, Icon, portalInitStyle, ErrorMessage, } from './style';

export default class Dropdown extends Component {
	state = {
		currentValue: this.props.defaultProp,
		isOpen: false,
		portalStyle: portalInitStyle,
		currentList: this.props.list,
	};

	componentDidUpdate(prevProps) {
		if (this.props.list !== prevProps.list) {
			this.setState({
				currentList: this.props.list,
			})
		}
	}

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