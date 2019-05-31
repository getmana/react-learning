import React from 'react';
import PropTypes from 'prop-types';
import { DropdownListItem, } from '../../../components';
import { ListThemed, } from './style';

const DropdownList = ({ list, onSelectVariant, }) => {
	return (
		<ListThemed>
			{
				list.map((item, index) => {
					return <DropdownListItem key={index} item={item} onSelectVariant={onSelectVariant} />
				})
			}
		</ListThemed>
	)
}

export default DropdownList;

DropdownList.propTypes = {
	onSelectVariant: PropTypes.func.isRequired,
	list: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	])).isRequired,
}