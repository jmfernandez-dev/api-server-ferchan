const { Router } = require ('express');
const router = Router();

const { login } = require('../controllers/auth.controller');

router.post('/api/v1/login', login);

module.exports = router;