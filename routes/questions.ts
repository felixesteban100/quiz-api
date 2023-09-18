import { expressModule } from "./expressModule"

const routerQuestions = expressModule.Router()

const {
    getAllQuestions,
    getFilteredQuestions,
    getAllQuestionsByUser,

    postQuestion,
    patchQuestion,
    deleteQuestion
} = require('../controllers/questions')

routerQuestions.route('/')
.get(getAllQuestions)
.post(postQuestion)

routerQuestions.route('/user')
.get(getAllQuestionsByUser)

routerQuestions
.route('/filter') 
.get(getFilteredQuestions) ///filter?categoryId=1&amount=1&difficulty=medium&type=boolean

routerQuestions.route('/:id')
.patch(patchQuestion)
.delete(deleteQuestion)


module.exports = routerQuestions