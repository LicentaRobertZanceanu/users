import { Users } from '../users-model.js'

export const getUsers = (req, res) => {
    Users.find({}, (err, docs) => {
        if (err) {
            res.status(400).json({ message: 'Error' })
            return
        }
        res.json(docs)
        return
    })
}