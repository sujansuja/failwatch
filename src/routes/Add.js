const router = require('express').Router()

router.route('/').post( async (req, res) => {

    res.send({message: "Request successful"});
});

module.exports = router;
