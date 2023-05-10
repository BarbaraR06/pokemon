const { Router } = require('express');
const { getTypeApi } = require('../controllers/typeController');



const router = Router()

router.get('/', async (req, res) => {
    const resultType = await getTypeApi()
    res.json(resultType)
})

module.exports = router;
