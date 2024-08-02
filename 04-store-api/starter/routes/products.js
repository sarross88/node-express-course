const express = require('express')
const router = express.Router()
const {getAllProductsStatic, getAllProducts} = require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)


module.exports = router;


//NOTE 1st controller, then add in here, then export router to app 