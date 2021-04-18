import { callApi, AUTH_MICROSERVICE_API } from './index.js'

export const checkAuthentication = async (req, res, next) => {
    const requestOptions = {
        uri: `${AUTH_MICROSERVICE_API}/is-authenticated`,
        headers: {
            authorization: req.headers.authorization
        }
    }
    try {
        let response = await callApi(requestOptions)
        if (response) {
            req.loggedInUser = response
            next()
        }
    } catch (error) {
        res
            .status(error.statusCode)
            .json(error.body)
    }
}