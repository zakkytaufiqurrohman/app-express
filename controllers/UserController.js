require('dotenv').config()
class UserController {
    static async test(req,res) {
        return res.send('haloo');
    }
}

module.exports = UserController