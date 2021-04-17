import { getUsers, createUser, getUserByEmail } from './controllers/index.js'

export const routes = (app) => {
    app.route('/users')
        .get(getUsers)
        .post(createUser)
    app.route('/users/:email')
        .get(getUserByEmail)
}