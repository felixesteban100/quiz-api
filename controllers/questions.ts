const Question = require('../models/Question')
const Category = require('../models/Category')

import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes"
import { Types } from 'mongoose';
const { BadRequestError, NotFoundError } = require('../errors/index')

interface CustomRequest extends Request {
    user: {
        userId: string;
    };
}

//✅
async function getAllQuestions(req: Request, res: Response) {
    const questions = await Question.find({})

    // console.log(questions[5].createdBy)

    res.status(StatusCodes.OK).json(questions)
}

//✅
async function getAllQuestionsByUser(req: CustomRequest, res: Response) {
    const { user: { userId } } = req

    const questions = await Question.find({ createdBy: new Types.ObjectId(userId) })
    
    res.status(StatusCodes.OK).json(questions)
}

//✅
async function getFilteredQuestions(req: Request, res: Response) {
    let { amount, categoryId, type, difficulty } = req.query

    const objectToFind: { category?: string, type?: string, difficulty?: string } = {}

    let categoryFinded = { name: "All" }

    if(typeof categoryId === "string" && categoryId !== "0"){
        categoryFinded = await Category.findOne({ id: parseInt(categoryId) })
        objectToFind.category = categoryFinded.name 
    }
    if(type !== "All") objectToFind.type = type?.toString()
    if(difficulty !== "All") objectToFind.difficulty = difficulty?.toString()

    const allQuestions = await Question.find({...objectToFind})

    const questionsFounded = allQuestions.sort(() => Math.random() - 0.5).slice(0, amount);

    res.status(StatusCodes.OK).json(questionsFounded)
}

//✅
async function postQuestion(req: CustomRequest, res: Response){
    req.body.createdBy = req.user.userId

    const getCategory = Category.find({name: req.body.category})

    if(getCategory === undefined) throw new BadRequestError(`Category introduced ${req.body.category} doesn't exist`)

    const question = await Question.create(req.body)
    res.status(StatusCodes.CREATED).send({ question })
}

//✅
async function patchQuestion(req: CustomRequest, res: Response){
    const {
        body: { category, type, difficulty, question, correct_answer, incorrect_answers },
        user: { userId },
        params: { id: questionId }
    } = req

    if(category === '' || type === '' || difficulty === '' || question === '' || correct_answer === '' || incorrect_answers.length === 0) throw new BadRequestError('All fields cannot be empty')

    const questionE = await Question.findByIdAndUpdate(
        { _id: new Types.ObjectId(questionId), createdBy: new Types.ObjectId(userId) },
        req.body,
        {new: true, runValidators: true}
    )

    if(!questionE) throw new NotFoundError(`No question found with id ${questionId}`)

    res.status(StatusCodes.OK).json({ questionE })
}

//✅
async function deleteQuestion(req: CustomRequest, res: Response){
    const {
        user: { userId },
        params: { id: questionId }
    } = req

    const questionE = await Question.findOneAndRemove({
        _id: new Types.ObjectId(questionId),
        createdBy: new Types.ObjectId(userId)
    })

    if(!questionE) throw new NotFoundError(`No question with id ${questionId}`)

    res.status(StatusCodes.OK).json({ msg: 'Question deleted'})
}

module.exports = {
    getAllQuestions,
    getFilteredQuestions,
    getAllQuestionsByUser,

    postQuestion,
    patchQuestion,
    deleteQuestion
}