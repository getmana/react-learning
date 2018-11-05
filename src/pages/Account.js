import React from 'react';
import styled from 'styled-components';
import { PageTitle, } from '../components';

const PageThemed = styled.div`
	padding: 20px;
`;

const Account = () => {
	return (
		<PageThemed>
			<PageTitle>Account Page</PageTitle>
		</PageThemed>
	)
}

export default Account;