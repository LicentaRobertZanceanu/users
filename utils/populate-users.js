import { Users } from '../users-model.js'
import faker from 'faker'
import bcrypt from "bcrypt"

export const populateUsers = async () => {
    let index = 0
    const toInsert = []
    const password = await bcrypt.hash('123456', 10)

    while (index < 1000) {
        const email = `robertzanceanu+test${index}@gmail.com`
        toInsert.push({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password,
            email
        })
        index += 1
    }
    console.log('a', toInsert)
    Users.insertMany(toInsert, (err,data) => {
        if(err) {
            console.log('big error',error)
            return
        }
        return data
    })    
}
