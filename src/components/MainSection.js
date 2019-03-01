import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainSectionThemed = styled.section`
	flex: 1;
	display: flex;
	flex-wrap: wrap;
	background-color: ${props => props.theme.bg}; 
`;

const MainSection = ({ children, }) => {
	return (
		<MainSectionThemed>
			{children}
		</MainSectionThemed>
	)
}

export default MainSection;

MainSection.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
}