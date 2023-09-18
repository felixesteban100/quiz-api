import { expressModule } from "./expressModule"

const routerAuth = expressModule.Router()

const { register, login } = require('../controllers/auth')

routerAuth.post('/register', register)
routerAuth.post('/login', login)

module.exports = routerAuth