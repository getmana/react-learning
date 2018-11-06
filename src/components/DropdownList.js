import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DropdownListItem from './DropdownListItem';

const ListThemed = styled.ul`
    display: flex;
    flex-direction: column;
    border: 2px solid ${props => props.theme.primary};
    color: ${props => props.theme.primary};
    background-color: ${props => props.theme.secondaryBg};
`;

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
	list: PropTypes.arrayOf(PropTypes.string).isRequired,
}