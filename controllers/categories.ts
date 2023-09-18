const Category = require('../models/Category')

import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes"
import { Types } from 'mongoose';
const { /* BadRequestError, */ NotFoundError } = require('../errors/index')

interface CustomRequest extends Request {
    user: {
        userId: string;
    };
}

//✅
async function getAllCategories(req: Request, res: Response) {
    const categories = await Category.find({})
    res.status(StatusCodes.OK).json(categories)
}

//✅
async function getAllCategoriesByUser(req: CustomRequest, res: Response) {
    const { user: { userId } } = req

    const questions = await Category.find({ createdBy: new Types.ObjectId(userId) })
    res.status(StatusCodes.OK).json(questions)
}

//✅
async function postCategory(req: CustomRequest, res: Response){
    req.body.createdBy = req.user.userId
    req.body.id = parseInt(req.body.id)

    const category = await Category.create(req.body)
    res.status(StatusCodes.CREATED).send({ category })
}

//✅
async function deleteCategory(req: CustomRequest, res: Response){
    const {
        user: { userId },
        params: { id: categoryId }
    } = req

    const categoryE = await Category.findOneAndRemove({
        _id: new Types.ObjectId(categoryId),
        createdBy: new Types.ObjectId(userId)
        
    })

    if(!categoryE) throw new NotFoundError(`No category with id ${categoryId}`)

    res.status(StatusCodes.OK).json({ msg: 'Category deleted'})
}

module.exports = {
    getAllCategories,
    getAllCategoriesByUser,
    postCategory,
    deleteCategory
}