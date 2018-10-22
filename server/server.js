const path = require('path')
const generate = require('nanoid/generate')

// create server
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// configure server
server.use(middlewares)
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