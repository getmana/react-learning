const path = require('path')
const generate = require('nanoid/generate')

// create server
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// configure server
server.use(middlewares)
server.use(jsonServer.bodyParser)
const token = generate('1234567890abcdef', 10)
const auth = {
	email: 'admin@gmail.com',
	phone: '1234567',
	password: 'admin',
}

// delay middleware
server.use((req, res, next) =>
	setTimeout(next, getRandomInt(1000, 2500))
)

// auth middleware
server.use((req, res, next) => {
	if (req.path === '/auth' || isAuthorized(req.query.token))
	  next()
	else
	  res.sendStatus(401)
})

// auth route
server.get('/auth', (req, res) => {
	const { email, phone, password, } = req.query
	console.log('/auth', email, phone, password)

	if (password === auth.password)
		if ((email === auth.email && !phone) || (phone === auth.phone && !email))
			res.json({ username: 'admin', userId: 123, token, })

	res.sendStatus(403)
})

server.post('/buy_books', (req, res) => {
	const {
		card: { number, name, date, cvc, },
		books,
	} = req.body

	if (typeof number !== 'number')
		return res.status(400).send('Invalid type of number')
	else if (String(number).length !== 16)
		return res.status(400).send('Invalid length of number')
	else if (typeof name !== 'string')
		return res.status(400).send('Invalid type of name')
	else if (String(number).length < 3)
		return res.status(400).send('Invalid length of number (<3)')
	else if (String(date).length !== 5)
		return res.status(400).send('Invalid length of number (5)')
	else if (typeof cvc !== 'number')
		return res.status(400).send('Invalid type of cvc')
	else if (String(cvc).length < 3)
		return res.status(400).send('Invalid length of cvc (<3)')
	else if (!Array.isArray(books))
		return res.status(400).send('books is not array')
	else if (!books.every(book => typeof book === 'number'))
		return res.status(400).send('book in books is not a number')

	res.sendStatus(200)
})

// start server
const port = 3002
server.use(router)
server.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

// helpers
function isAuthorized(value) {
	return value === token
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}