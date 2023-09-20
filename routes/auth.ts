import { expressModule } from "./expressModule"

const routerAuth = expressModule.Router()

const { postUser/* register *//* , login */ } = require('../controllers/auth')

routerAuth.post('/', postUser)
// routerAuth.post('/register', register)
// routerAuth.post('/login', login)

module.exports = routerAuth