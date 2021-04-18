import request from "request"

export const callApi = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject({
                    statusCode: 500,
                    body: {
                        message: "Internal server error!"
                    }
                })
            }
            let responseBody = body
            if(typeof body === 'string') {
                responseBody = JSON.parse(body)
            }

            if (response.statusCode >= 400) {
                reject({
                    statusCode: response.statusCode,
                    body:responseBody,
                })
            }
            resolve(responseBody)
        })
    })
}