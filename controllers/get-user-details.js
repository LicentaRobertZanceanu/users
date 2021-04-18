import { Users } from "../users-model.js";

export const getUserDetails = (req, res) => {
    Users.find(
        {
            _id: req.loggedInUser._id
        },
        (err, docs) => {
            if (err) {
                res
                    .status(404)
                    .json({
                        message: 'User not found!'
                    })
            } else {
                res
                    .json(docs[0])
            }

        }
    )
    return
}