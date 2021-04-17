import { findUserByEmail } from '../utils/index.js'

export const getUserByEmail = async (req, res) => {
    const userFound = await findUserByEmail(req.params.email)
        .then(response => {
            if (response) {
                return response
            }

            return null
        })
        .catch(error => {
            console.log('error', error)
        })

    if (!userFound) {
        res
            .status(404)
            .json({
                message: "User is not found!"
            })
        return
    }

    res.json(userFound)
    return
}