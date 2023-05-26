const passwordHash = require('pbkdf2-password-hash')

// Password encrypt ...
const encrypt = async (password) => {
    return await passwordHash.hash(password, { iteration: 100, digest: 'sha1', keylen: 16, stalen: 16 })
}

// compare password ...
const comparePassword = async (plainPassword, hashedPassword) => {
    return await passwordHash.compare(plainPassword, hashedPassword)
}

module.exports = { encrypt, comparePassword }