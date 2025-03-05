const express = require("express"); 
const userRoutes = require("./user");
const accountRouter = require('./account');

const router = express.Router();

router.use("/users", userRoutes);

router.use('/account', accountRouter);

module.exports = router;

