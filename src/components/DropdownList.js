import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ListThemed = styled.ul`
    display: flex;
    flex-direction: column;
    border: 2px solid ${props => props.theme.primary};
    color: ${props => props.theme.primary};
    background-color: ${props => props.theme.secondaryBg};
`;

const ItemThemed = styled.li`
    padding: 0.4em 1em;
    cursor: pointer;

    :hover {
        background-color: ${props => props.theme.unactive};
    }
`;

const DropdownList = ({ list, selectVariant, }) => {
	return (
		<ListThemed>
			{
				list.map((item, index) => {
					return <ItemThemed key={index} onClick={() => selectVariant(index)}>
						{item}
					</ItemThemed>
				})
			}
		</ListThemed>
	)
}

export default DropdownList;

DropdownList.propTypes = {
	selectVariant: PropTypes.func.isRequired,
	list: PropTypes.arrayOf(PropTypes.string).isRequired,
}