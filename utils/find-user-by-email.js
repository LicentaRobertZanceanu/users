import { Users } from "../users-model.js";

export const findUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        Users.find({ email }, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc[0])
        })
    })
}