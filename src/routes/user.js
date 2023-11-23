const { Router } = require ('express');
const router = Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller')

router.get('/api/v1/users', getUsers);
router.get('/api/v1/user/:id', getUserById);
router.post('/api/v1/user', createUser);
router.put('/api/v1/user/:id', updateUser);
router.delete('/api/v1/user/:id', deleteUser);



module.exports = router;
