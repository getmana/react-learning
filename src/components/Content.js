import React from 'react';
import styled from 'styled-components';
import PageTitle from './PageTitle';
import Title from './Title';
import Card from './Card';
import Input from './Input';
import Dropdown from './Dropdown';
import Table from './Table';
import { cards, tableContent, list, } from '../mock/mockData';

const ContentThemed = styled.main`
    padding: 20px;
    flex: 1 0 280px;
`;

const CardContainer = styled.section`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

const CardTitle = styled.div`
    color: #fff;
    background-color: ${props => props.theme.primary};
    padding: 10px;
`;

const CardContent = styled.div`
    padding: 20px;
    line-height: 1.5em;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Content = () => {
	return (
		<ContentThemed>
			<PageTitle>Here is content</PageTitle>
			<Title>Cards Section</Title>
			<CardContainer>
				{
					cards.map((card) => {
						return (
							<Card key={card.id}>
								<CardTitle>{card.title}</CardTitle>
								<CardContent>{card.content}</CardContent>
							</Card>
						)
					})
				}
			</CardContainer>
			<Title>Inputs Section</Title>
			<InputContainer>
				<Input type="text" label="Name:" />
				<Input type="password" icon="remove_red_eye" />
				<Dropdown label="Select color" defaultProp="orange" list={list} />
			</InputContainer>
			<Title>Table Section</Title>
			<Table caption="Mock Table" tableContent={tableContent} />
		</ContentThemed>
	)
}

export default Content;