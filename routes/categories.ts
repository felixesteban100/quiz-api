import { expressModule } from "./expressModule"

const routerCategories = expressModule.Router()

const {
    getAllCategories,
    getAllCategoriesByUser,
    postCategory,
    deleteCategory
} = require('../controllers/categories')

routerCategories.route('/')
.get(getAllCategories)
.post(postCategory)

routerCategories.route('/user')
.get(getAllCategoriesByUser)

routerCategories.route('/:id')
.delete(deleteCategory)

module.exports = routerCategories