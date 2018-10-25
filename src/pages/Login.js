import React, { Component, } from 'react';
import { reduxForm, connect, formValueSelector, } from '../decorators';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Dropdown, Input, Button, Form, Field, } from '../components';
import { required, emailValue, normalizePhone, numberLength, } from '../helpers';
import { loginStart, } from '../store/models/user';

const authType = [ 'phone', 'email' ];

const FormBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

// @reduxForm({
// 	form: 'loginForm',
// })
export class Login extends Component {
	state = {
		isPhone: true,
	}

	selectVariant = (variant) => {
		let isPhone = true;

		if (variant === 'email') {
			isPhone = false
		}
		this.setState({
			isPhone,
		})
	}

	render() {
		const { isPhone, } = this.state;
		const { handleSubmit, processing, password, } = this.props;

		return (
			<FormBox>
				<Form onSubmit={handleSubmit}>
					<Field
						name="authType"
						disabled={processing}
						component={Dropdown}
						label="Select authorization type:"
						defaultProp="phone"
						list={authType}
						onSelect={this.selectVariant}
					/>
					{isPhone &&
						<Field
							name="phone"
							disabled={processing}
							component={Input}
							type="text"
							label="Enter your phone number:"
							placeholder="555-55-55"
							validate={numberLength}
							normalize={normalizePhone}
						/>
					}
					{!isPhone &&
						<Field
							name="email"
							disabled={processing}
							component={Input}
							type="email"
							validate={emailValue}
							label="Enter your email:"
							placeholder="mail@gmail.com"
						/>
					}
					<Field
						name="password"
						currentValue={password}
						disabled={processing}
						component={Input}
						type="password"
						validate={required}
						label="Enter your password: *"
						icon="remove_red_eye"
					/>
					<Button styles="primary" type="submit" loading={processing}>Log In</Button>
				</Form>
			</FormBox>
		)
	}
}

Login.propTypes = {
	handleSubmit: PropTypes.func,
	processing: PropTypes.bool.isRequired,
	password: PropTypes.string,
}

const LoginContainer = reduxForm({
	form: 'loginForm',
	onSubmit: (values, dispatch ) => {
		dispatch(loginStart(values));
	},
})(Login);

const selector = formValueSelector('loginForm')

const mapStateToProps = (state) => {
	const password = selector(state, 'password');

	return ({
		processing: state.user.processing,
		password,
	})
}

export default connect(
	mapStateToProps,
	{ loginStart, },
)(LoginContainer);