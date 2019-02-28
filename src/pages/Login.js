import React, { Component, } from 'react';
import { reduxForm, connect, formValueSelector, } from '../decorators';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Dropdown, Input, Button, Form, Field, PageTitle, } from '../components';
import { required, emailValue, formatPhone, numberLength, parsePhone, } from '../helpers';
import { loginStart, } from '../store/models/user';

const authType = [ 'phone', 'email' ];

const FormBox = styled.div`
	padding: 20px;
	max-width: 300px;
`;

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
		this.props.change('authType', variant)
	}

	render() {
		const { isPhone, } = this.state;
		const { handleSubmit, processing, password, } = this.props;
		const defaultProp = 'phone';

		return (
			<FormBox>
				<PageTitle>Please, Sign In</PageTitle>
				<Form onSubmit={handleSubmit}>
					<Field
						name="authType"
						disabled={processing}
						component={Dropdown}
						label="Select authorization type:"
						defaultProp={defaultProp}
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
							format={formatPhone}
							parse={parsePhone}
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
					<Button style="primary" type="submit" loading={processing}>Log In</Button>
				</Form>
			</FormBox>
		)
	}
}

Login.propTypes = {
	handleSubmit: PropTypes.func,
	processing: PropTypes.bool.isRequired,
	password: PropTypes.string,
	change: PropTypes.func,
}

const LoginContainer = reduxForm({
	form: 'loginForm',
	enableReinitialize: true,
	onSubmit: (values, dispatch ) => {
		dispatch(loginStart(values));
	},
})(Login);

const selector = formValueSelector('loginForm')

const mapStateToProps = (state) => {
	const password = selector(state, 'password');
	const initLogin = {
		authType: 'phone',
	}

	return ({
		processing: state.user.processing,
		password,
		initialValues: { ...initLogin, },
	})
}

export default connect(
	mapStateToProps,
	{ loginStart, },
)(LoginContainer);