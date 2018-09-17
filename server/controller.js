const bcrypt = require('bcryptjs')
var sessionIDCount = 1;

module.exports = {
    checkUser: (req, res) => {
        console.log(req.session)
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(400).send('no user')
        }
    },
    registerUser: (req, res) => {
        const { userID, username, email, password } = req.body
        const db = req.app.get('db')
        db.checkEmail([email]).then(user => {
            console.log(user);
            if (user.length !== 0) {
                res.status(200).send('email taken. Try another.')
            } else {
                const salt = bcrypt.genSaltSync(10)
                console.log('salt: ', salt)
                const hash = bcrypt.hashSync(password, salt)
                console.log('hash: ', hash)
                db.registerUser([username, email, hash]).then((user) => {
                    let s = req.session.user;
                    s.sessionID = sessionIDCount
                    sessionIDCount++
                    s.userID = user[0].userid
                    s.username = user[0].username;
                    s.email = user[0].email
                    console.log('registered: ', req.session)
                    res.status(200).send(s)
                })
                    .catch((e) => {
                        console.log(e);
                        res.status(500).send(e)
                    })
            }
        })
    },
    loginUser: (req, res) => {
        const { username, email, password } = req.body
        const db = req.app.get('db')
        db.checkEmail([email]).then(user => {
            if (user.length !== 0) {
                const validPassword = bcrypt.compareSync(password, user[0].password)
                if (validPassword) {
                    console.log(user)
                    let s = req.session.user;
                    s.sessionID = sessionIDCount;
                    sessionIDCount++;
                    s.userID = user[0].userid;
                    s.username = user[0].username;
                    s.email = user[0].email;
                    res.status(200).send(s);
                    console.log(req.session.user);
                } else {
                    res.status(200).send('Invalid Password')
                }
            } else {
                res.status(200).send('User does not exist')
            }
        })
            .catch((e) => {
                console.log(e);
                res.status(500).send(e)
            })
    },
    logout(req, res, next) {
        req.session.destroy()
        sessionIDCount = 1;
        res.status(200).send(req.session)
        console.log(req.session)
    },
    getInv(req, res, next) {
        const db = req.app.get('db')
        db.getInventory()
            .then(inv => res.status(200).send(inv))
            .catch((e) => {
                console.log(e);
                res.status(500).send(e)
            }
            )
    }
}