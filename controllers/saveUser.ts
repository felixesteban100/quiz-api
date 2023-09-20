import { Request, Response } from 'express';
import { RequireAuthProp } from '@clerk/clerk-sdk-node';
const User = require('../models/User')
import { StatusCodes } from "http-status-codes"
const { BadRequestError } = require('../errors/index')

async function postUser(req: RequireAuthProp<Request>, res: Response) {
    const userInfo = {
        userId: req.auth.userId,
        username: req.body.username ?? req.body.fullName,
        fullName: req.body.fullName,
        imageUrl: req.body.imageUrl,
        lastSignInAt: req.body.lastSignInAt,
        updatedAt: req.body.updatedAt,
        createdAt: req.body.createdAt,
    }

    const userFinded = await User.findOne({ userId: req.auth.userId })

    if (userFinded !== undefined && userFinded !== null) {
        throw new BadRequestError('User exits, no need to re-save')
    } else {
        User.create(userInfo)
        res
            .status(StatusCodes.CREATED)
            .json(userInfo)
    }

}

module.exports = {
    postUser
}