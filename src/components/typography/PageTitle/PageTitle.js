import React from 'react';
import PropTypes from 'prop-types';
import { PageTitleThemed, } from './style';

const PageTitle = ({ children, }) => {
	return (
		<PageTitleThemed>{children}</PageTitleThemed>
	)
}

export default PageTitle;

PageTitle.propTypes = {
	children: PropTypes.string.isRequired,
}