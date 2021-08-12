const router = require('express').Router();
const withAuth = require('../utils/auth');
const { posts } = require('../models/index')

router.get('/', withAuth, async (req, res) => {
    try {
        const allPosts = await posts.findAll();

        const newPosts = allPosts.map((postList) => postList.get({ plain: true })
        );

        console.log(newPosts);

        res.render('home', {
            loggedIn: req.session.loggedIn,
            thisUser: req.session.thisUser,
            newPosts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    };

    res.render('signup');
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


router.get('/makePost', withAuth, async (req, res) => {

    thisUserId = req.session.thisUser.id;
    thisUserName = req.session.thisUser.username;
    console.log(thisUserId);

    res.render('makePost', {
        loggedIn: req.session.loggedIn,
        thisUser: req.session.thisUser,
        userDataId: [{ test: thisUserId }],
        userDataName: [{ test: thisUserName }]

    })
});


router.get('/myPosts', withAuth, async (req, res) => {



    var thisUsersPosts = posts.findAll({
        attributes: [
            'title', 'body',

        ],
        where: {
            user_id: req.session.thisUser.id,
        }

    })


        .then(function (data) {


            console.log(data)
            res.render('myPosts', {

                loggedIn: req.session.loggedIn,
                thisUser: req.session.thisUser,
                myPosts: data,


            })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})



module.exports = router;