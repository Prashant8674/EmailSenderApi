const router = require("express").Router();

const {getBill }= require('../controller/appController');


router.post('/product/getBill',getBill);

module.exports = router;