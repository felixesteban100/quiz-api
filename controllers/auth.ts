// import { Request, Response } from 'express';
// import { RequireAuthProp } from '@clerk/clerk-sdk-node';
// const User = require('../models/User')
// import { StatusCodes } from "http-status-codes"
// const { BadRequestError, UnauthenticatedError } = require('../errors/index')

// async function postUser(req: RequireAuthProp<Request>, res: Response) {
//     const userInfo = {
//         userId: req.body.id,
//         username: req.body.username,
//         passwordEnabled: req.body.username,
//         fullName: req.body.fullName,
//         imageUrl: req.body.imageUrl,
//         lastSignInAt: req.body.lastSignInAt,
//         updatedAt: req.body.updatedAt,
//         createdAt: req.body.createdAt,
//     }

//     function hasAllProperties<T>(obj: T): boolean {
//         for (const key in obj) {
//             if (obj[key] === undefined) {
//                 return false;
//             }
//         }
//         return true;
//     }
    
//     console.log(userInfo)
    
//     const userFinded = User.findOne({ userId: userInfo.userId })

//     if(!userFinded) throw new UnauthenticatedError('Invalid Credentials')

//     /* if (userFinded !== undefined) res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ msg: 'User already added' }) */

//     if (hasAllProperties(userInfo)) {
//         User.create({ ...req.body })
//         res
//             .status(StatusCodes.CREATED)
//             .json(userInfo)
//     } else {
//         res
//             .status(StatusCodes.BAD_REQUEST)
//             .json({ msg: 'Missing properties' })
//     }
// }

// async function register(req: RequireAuthProp<Request>, res: Response) {
//     // this error handler isn't necessary (but I like to double check the security)
//     // const { name, email, password } = req.body
//     const { 
//         id, 
//         username, 
//         passwordEnabled, 
//         fullName, 
//         imageUrl, 
//         lastSignInAt, 
//         updatedAt, 
//         createdAt,
//         userId
//         // ...req.auth
//     } = req.body

//     const userInfo = { 
//         id, 
//         username, 
//         passwordEnabled, 
//         fullName, 
//         imageUrl, 
//         lastSignInAt, 
//         updatedAt, 
//         createdAt,
//         userId
//         // ...req.auth
//     }

//     console.log(userInfo)

//     // if(!id || !username || !passwordEnabled) throw new BadRequestError('Please provide name, email and password')
//     // this error handler isn't necessary (but I like to double check the security)

//     // const userFinded = User.findOne({ id: req.body.id }) 
//     // if(userFinded) throw new BadRequestError('the user Exits')
//     // User.create({...req.body})
//     // const user = await User.create({...req.body})
//     // const token = user.createJWT()

//     res
//         .status(StatusCodes.CREATED)
//         .json({ id, username, passwordEnabled, fullName, imageUrl, lastSignInAt, updatedAt, createdAt, userId })
// }

// async function login(req: Request, res: Response){
//     const {email, password} = req.body

//     if(!email || !password) throw new BadRequestError('Please provide email and password')

//     const user = await User.findOne({ email })
//     if(!user) throw new UnauthenticatedError('Invalid Credentials')
    
//     const isPasswordCorrect = await user.comparePassword(password)
//     if(!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials')
    
//     // compare/verified password
//     const token = user.createJWT()

//     res
//     .status(StatusCodes.OK)
//     .json({ user: { name: user.name, id: user.id }, token })
// }

// module.exports = {
//     postUser
//     // register,
//     // login,
// }