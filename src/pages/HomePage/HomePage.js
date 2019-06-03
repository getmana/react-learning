import React, { Component, } from 'react';
import { PageTitle, Title, Card, Table, } from '../../components';
import { Input, Dropdown, } from '../../modules';
import { cards, tableContent, list, } from '../../mock/mockData';
import { ContentThemed, CardContainer, CardTitle, CardContent, InputContainer, } from './style';

export default class Content extends Component {
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

	handleClickRow = () => {
		console.log('Clicked!');
	}

	renderCard = (card) => (
		<Card key={card.id}>
			<CardTitle>{card.title}</CardTitle>
			<CardContent>{card.content}</CardContent>
		</Card>
	)

	render() {
		const { name, password, } = this.state;
		const tableColumns = [ 'id', 'name', 'size', 'description', 'price' ];

		return (
			<ContentThemed>
				<PageTitle>Here is content</PageTitle>
				<Title>Cards Section</Title>
				<CardContainer>
					{
						cards.map((card) => this.renderCard(card))
					}
				</CardContainer>
				<Title>Inputs Section</Title>
				<InputContainer>
					<Input type="text" label="Name:" currentValue={name} onChange={(e) => this.handleChange('name', e.target.value)} />
					<Input type="password" icon="remove_red_eye" currentValue={password} onChange={(e) => this.handleChange('password', e.target.value)} />
					<Dropdown label="Select color" defaultProp="orange" list={list} onSelect={this.selectColor} />
				</InputContainer>
				<Title>Table Section</Title>
				<Table caption="Mock Table" tableColumns={tableColumns} tableContent={tableContent} onClick={this.handleClickRow} />
			</ContentThemed>
		)
	}
}