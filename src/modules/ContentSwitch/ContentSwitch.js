import React from 'react';
import { Route, Switch, } from 'react-router-dom';
import { Account, HomePage, Login, Books, SingleBook, BuyBooks, } from '../../pages';

const ContentSwitch = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route path="/login" component={Login} />
		<Route path="/account" component={Account} />
		<Route path="/search/:params" component={Books} />
		<Route path="/books" component={Books} />
		<Route path="/book/:id" component={SingleBook} />
		<Route path="/buy-books" component={BuyBooks} />
	</Switch>
)

export default ContentSwitch;