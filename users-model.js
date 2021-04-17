import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
})

export const Users = mongoose.model('Users', UsersSchema)