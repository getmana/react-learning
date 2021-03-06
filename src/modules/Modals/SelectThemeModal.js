import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { themeIndigo, themeOrange, } from '../../configs/themes';
import { Button, } from '../../components';
import { LabelThemed, } from './style';

const SelectThemeModal = ({ theme, selectTheme, onClose, }) => {
	return (
		<Fragment>
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
			<Button style="primary" onClick={onClose}>ok</Button>
		</Fragment>
	)
}

export default SelectThemeModal;

SelectThemeModal.propTypes = {
	selectTheme: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	theme: PropTypes.objectOf(PropTypes.string).isRequired,
}