import { Users } from "../users-model.js"
import { findUserByEmail } from "../utils/find-user-by-email.js"

export const updateUser = async (req, res) => {
    if (!req.body.email || !req.body.firstName || !req.body.lastName) {
        res
            .status(400)
            .json({
                message: "At least one field is missing!"
            })
        return
    }

    let emailExists = false
    if (req.body.email !== req.loggedInUser.email) {
        await findUserByEmail(req.body.email)
            .then(response => {
                if (response) {
                    emailExists = true
                }
            })
            .catch(error => {
                emailExists = false
            })
    }
    if (emailExists) {
        res
            .status(400)
            .json({
                message: "Email already exists!"
            })
        return
    }
    await Users.updateOne({
        _id: req.loggedInUser._id
    }, {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, (err, result) => {
        if (err) {
            console.log('err', err)
            res
                .status(400)
                .json({
                    message: err
                })
            return
        }

        if (result.ok === 1) {
            res.json({
                ...req.body,
                id: req.loggedInUser._id
            })
        } else {
            res.json({
                message: "Update failed!"
            })
        }
        return
    })
    return
}