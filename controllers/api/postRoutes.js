const router = require("./userRoutes");
const withAuth = require('../../utils/auth')
const { posts, user, comments } = require('../../models')

router.get('/:id', withAuth, async (req, res) => {
    try {
        const thisPost = await posts.findByPk(req.params.id, {
            include: [{ all: true, nested: true }]
    
        })

        if (!thisPost) {
            res.status(404).json({ message: 'No Post Here' });
            return;
        }



    } catch (err) {
        res.status(500).json(err)
    }
})


router.post('/', withAuth, async (req, res) => {
    console.log('********************');
    console.log(req.session);
    posts.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.body.user_id
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});





module.exports = router;