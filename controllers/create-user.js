import { Users } from "../users-model.js";
import { findUserByEmail } from '../utils/index.js';
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)
        .then(response => {
            return response
        })
        .catch(error => {
            console.log('encryption error', error)
        })

    if (!encryptedPassword) {
        res
            .status(500)
            .json({
                message: 'Internal server error'
            })
        return
    }

    const userFound = await findUserByEmail(req.body.email)
        .then(response => {
            if (response) {
                return true
            }

            return false
        })
        .catch(error => {
            console.log('error', error)
        })

    if (userFound) {
        res
            .status(400)
            .json({
                message: "The user already exists!"
            })
        return
    }

    const newUser = new Users({
        ...req.body,
        password: encryptedPassword
    })

    newUser.save((err, user) => {
        if (err) {
            res
                .status(500)
                .json({
                    message: 'Internal server error!'
                })
            return
        }
        res.json(user)
        return
    })

    return
}