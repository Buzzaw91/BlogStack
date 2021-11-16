const bcrypt = require('bcryptjs')

const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = compareHash;