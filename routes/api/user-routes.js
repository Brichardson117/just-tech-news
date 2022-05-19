const router = require('express').Router();
const { User, Post, Vote } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // Access our user model and run .findAll() method). similar to SELECT * FROM user
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GER /api/users/1
router.get('/:id', (req, res) => {
    //getting only one piece of data back. similar to SELECT * FROM user WHERE id= 1
    User.findOne({
       include: [
           {
               model: Post,
               attributes: ['id', 'title', 'post_url', 'created_at']
           },
           {
               model:Post,
               attributes: ['title'],
               through: Vote,
               as: 'voted_posts',
           }
       ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users
router.post('/', (req, res) => {
    //insert data.  similar to INSERT INTO users VALUES ("name", "email", "password")
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST method carries the request parameter in req.body, which makes it a more secure way of transferring data from the client to the server. 
router.post('/login', (req, res) => {
    //expects {email: email@email.com, password: password123}
    //Query Operation
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No User with that email address!' });
            return;
        }
        //Verify User   
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect Password!' });
            return;
        }

        res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
});

//PUT /api/users/1
router.put('/:id', (req, res) => {
    // combines the parameters for creating data and looking up data. similar to UPDATE users SET username = "name", email = "email", password = "newPassword" WHERE id = 1;
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id ' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    // used to delete data with provided identifier
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id ' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
