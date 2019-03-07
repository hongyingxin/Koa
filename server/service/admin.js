const mongoose = require('mongoose')

export const checkPassword = async (email, password) => {
    let match = false
    const User = mongoose.model('User')
    const user = await User.findOne({ email })

    if (user) {
        match = await user.comparePassword(password, user.password)
    }

    return {
        match,
        user
    }
}