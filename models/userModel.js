const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const slugify = require('slugify')
const convertToEnglish = require('./../utils/nonAccentVietnamese')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    slug: String,
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    photo: {
        type: String,
        default: 'default-photo.png'
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el){
                return el === this.password
            },
            message: 'Password not same'
        }
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
},{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
})

userSchema.pre('save', function(next) {
    this.slug = slugify(convertToEnglish(this.name), {lower: true})
    next()
})

userSchema.pre('save', async function (next){
    // Nếu password được thay đổi thì mới tiến hành thực hiện chức năng của hàm
    if(!this.isModified('password')){
        return next()
    }

    this.password = await bcrypt.hash(this.password, 12)

    // Xóa đi pasword confirm
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('save', function (next){
    // Nếu hàm này thực hiện THAY ĐỔI MẬT KHẨU thì mới tiếp tục
    if(!this.isModified('password') || this.isNew) {
        return next()
    }

    // Giải thích: Có nghĩa là khi vừa đổi mật khẩu thì cũng đồng thời cung cấp một token mới vì thế để token được chấp nhận với đk là phải được tạo sau thời gian password thay đổi (trong trường hợp đã thay đổi password). Vì vậy cần phải trừ lại 1s để chắc chắn không bị từ chối bởi điều kiện đó
    this.passwordChangeAt = Date.now() - 1000
    next()
})

userSchema.pre(/^find/, function(next){
    this.find({active: {$ne: false}})
    next()
})

// userSchema.pre('findByIdAndUpdate', function(next){
//     this.find({active: {$ne: false}})
//     next()
// })

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangeAt){
        const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10)

        // Ví dụ: là cái mã JWT được tạo ra lúc 2h chiều và được gửi tới thằng kia, yêu cầu nó trong 10 phút phải xác minh. Thì tới 2h5p nó mới xác minh nghĩa là 
        // 2h < 2h5p
        return JWTTimestamp < changedTimestamp
    }
    return false
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto.createHash('sha256')
                                    .update(resetToken)
                                    .digest('hex')
    
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000
    
    return resetToken
}

const User = mongoose.model('User', userSchema)

module.exports = User