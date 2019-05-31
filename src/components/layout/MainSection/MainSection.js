import React from 'react';
import PropTypes from 'prop-types';
import { MainSectionThemed, } from './style';

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