const Category = require('../models/Category')

import { RequireAuthProp } from '@clerk/clerk-sdk-node';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes"
import { Types } from 'mongoose';
const { /* BadRequestError, */ NotFoundError } = require('../errors/index')

/* interface CustomRequest extends Request {
    user: {
        userId: string;
    };
    session: {
        userId: string
    }
} */

//✅
async function getAllCategories(req: Request, res: Response) {
    const categories = await Category.find({})
    res.status(StatusCodes.OK).json(categories)
}

//✅
async function getAllCategoriesByUser(req: RequireAuthProp<Request>, res: Response) {
    // const { user: { userId } } = req
    const { auth: { userId } } = req

    // const questions = await Category.find({ createdBy: new Types.ObjectId(userId) })
    const questions = await Category.find({ createdBy: userId })
    res.status(StatusCodes.OK).json(questions)
}

//✅
async function postCategory(req: RequireAuthProp<Request>, res: Response){
    // req.body.createdBy = req.user.userId
    req.body.createdBy = req.auth.userId
    req.body.id = parseInt(req.body.id)

    const category = await Category.create(req.body)
    res.status(StatusCodes.CREATED).send({ category })
}

//✅
async function deleteCategory(req: RequireAuthProp<Request>, res: Response){
    const {
        // user: { userId },
        auth: { userId },
        params: { id: categoryId }
    } = req

    // const categoryE = await Category.findOneAndRemove({
    //     _id: new Types.ObjectId(categoryId),
    //     createdBy: new Types.ObjectId(userId)
    // })
    const categoryE = await Category.findOneAndRemove({
        _id: new Types.ObjectId(categoryId),
        createdBy: userId
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