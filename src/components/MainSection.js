import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Content from './Content';

const MainSectionThemed = styled.section`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    background-color: ${props => props.theme.bg}; 
`;

const MainSection = ({ onOpenModal, }) => {
	return (
		<MainSectionThemed>
			<Sidebar onOpenModal={onOpenModal} />
			<Content />
		</MainSectionThemed>
	)
}

export default MainSection;

MainSection.propTypes = {
	onOpenModal: PropTypes.func.isRequired,
}