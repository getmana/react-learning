import React, { Component, } from 'react';
import styled from 'styled-components';
import { PageTitle, Title, Card, Input, Dropdown, Table, } from '../components';
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
	max-width: 300px;
`;

class Content extends Component {
	state = {
		color: 'orange',
		name: '',
		password: '',
	}

	handleChange = (name, value) => {
		this.setState({
			[name]: value,
		})
	}

	selectColor = (color) => {
		this.setState({
			color,
		})
	}

	render() {
		const { name, password, } = this.state;
		const tableColumns = [ 'id', 'name', 'size', 'description', 'price' ];

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
					<Input type="text" label="Name:" currentValue={name} onChange={(e) => this.handleChange('name', e.target.value)} />
					<Input type="password" icon="remove_red_eye" currentValue={password} onChange={(e) => this.handleChange('password', e.target.value)} />
					<Dropdown label="Select color" defaultProp="orange" list={list} onSelect={this.selectColor} />
				</InputContainer>
				<Title>Table Section</Title>
				<Table caption="Mock Table" tableColumns={tableColumns} tableContent={tableContent} />
			</ContentThemed>
		)
	}
}

export default Content;