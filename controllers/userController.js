const AppError = require('./../utils/appError')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const slugify = require('slugify')
const convertToEnglish = require('./../utils/nonAccentVietnamese')


// ĐỊNH NGHĨA CÁC "IF" SỬ DỤNG CHO ADMIN    
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        status: 'success',
        length: users.length,
        data: {
            data: users
        }
    })
})

exports.createUser = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body)

    if(!newUser){
        return next(new AppError(`Can't create new user. Try again!!!`, 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: newUser
        }
    })
})

exports.getUser = catchAsync(async (req, res, next) =>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new AppError(`Don't find user with ID.`, 400))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: user
        }
    })
})

exports.updateUser = catchAsync(async (req, res, next) => {
    if(req.body.name){
        req.body.slug = slugify(convertToEnglish(req.body.name), {lower: true})
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if(!user){
        return next(new AppError(`Don't find user with ID, so no update :(`, 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: user
        }
    })
})

// Xóa ở đây thì xóa tạm thời
exports.removeUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
        active: false
    })

    if(!user){
        return next(new AppError(`Don't find user with ID`, 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: user
        }
    })
})

// Xóa ở đây thì xóa 
exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user){
        return next(new AppError(`Don't find user with ID`, 404))
    }

    res.status(200).json({
        status: 'success',
        data: null
    })
})