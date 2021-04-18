import { getUsers, createUser, getUserByEmail, getUserDetails, updateUser } from './controllers/index.js'
import { checkAuthentication } from './utils/index.js'

export const routes = (app) => {
    app.route('/users')
        .get(getUsers)
        .post(createUser)
        .put(checkAuthentication, updateUser)
    app.route('/users/logged-in')
        .get(checkAuthentication, getUserDetails)
    app.route('/users/:email')
        .get(getUserByEmail)

}