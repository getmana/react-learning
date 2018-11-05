import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { themeIndigo, themeOrange, } from '../configs/themes';
import Button from './Button';

const ModalThemed = styled.div`
    height: 100%;
    text-align: center;
    
    border: 2px solid ${props => props.theme.primary};
    background-color: ${props => props.theme.secondaryBg};
`;

const ModalTitle = styled.div`
    color: #fff;
    background-color: ${props => props.theme.primary};
    padding: 10px;
`;

const ModalContent = styled.div`
    display: flex;
    height: 100%;
    padding: 0 20%;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const LabelThemed = styled.label`
    padding: 0 20px;
    cursor: pointer;
`;

const SelectThemeModal = ({ theme, selectTheme, onClose, }) => {
	return (
		<ModalThemed>
			<ModalTitle>Select the Theme</ModalTitle>
			<ModalContent>
				<form action="">
					<LabelThemed>
						<input
							type="radio"
							value="indigo"
							checked={theme === themeIndigo}
							onChange={() => selectTheme('indigo')}
						/>
						<span>Indigo</span>
					</LabelThemed>
					<LabelThemed>
						<input
							type="radio"
							value="orange"
							checked={theme === themeOrange}
							onChange={() => selectTheme('orange')}
						/>
						<span>Orange</span>
					</LabelThemed>
				</form>
				<Button type="button" style="primary" onClick={onClose}>ok</Button>
			</ModalContent>
		</ModalThemed>
	)
}

export default SelectThemeModal;

SelectThemeModal.propTypes = {
	selectTheme: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	theme: PropTypes.objectOf(PropTypes.string).isRequired,
}