import { expressModule } from "./expressModule"

const routerSaveUser = expressModule.Router()

const {
    postUser,
} = require('../controllers/saveUser')

routerSaveUser.route('/')
.post(postUser)

module.exports = routerSaveUser