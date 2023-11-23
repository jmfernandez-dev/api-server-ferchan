const pool = require('../db/postgres');
const bcrypt = require('bcrypt');

const isExpToken = require('../utils/helpers');

const getUsers = async (req, res) => {
    try {
        if (isExpToken(req)) {
            return res.status(401).send({error: 'Token expired'});
        }

        const response = await pool.query('SELECT * FROM app_user');
        res.json(response.rows);
    } catch (error) {
        res.status(401).send({error: error.message});
    }   
}

const getUserById = async (req, res) => {
        try {
            if (isExpToken(req)) {
                return res.status(401).send({error: 'Token expired'});
            }

            const id = req.params.id;
            const response = await pool.query('SELECT * FROM app_user WHERE idUser = $1', [id]);
           
            if (response.rowCount == 0) {
                res.json({message: "User not found"});
             } else {
                res.json(response.rows);
            }         
        } catch (error) {
            res.status(401).send({error: error.message});
        }
    
}

const createUser = async (req, res) => {
    try {
        if (isExpToken(req)) {
            return res.status(401).send({error: 'Token expired'});
        }
        const { idRole, idCategory, idContractHours, userName, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await pool.query('INSERT INTO app_user (idRole, idCategory, idContractHours, userName, password) VALUES ($1, $2, $3, $4, $5)',
         [ idRole, idCategory, idContractHours, userName, hashedPassword ]);
    
         res.status(201).json({
            message: "User Added succesfully",
            body: {
                user: {idRole, idCategory, idContractHours, userName, hashedPassword}
            }
         });
    } catch (error) {
        res.status(401).send({error: error.message});
    }
   
}

const updateUser = async (req, res) => {
    try {
        if (isExpToken(req)) {
            return res.status(401).send({error: 'Token expired'});
        }
        const id = req.params.id;
        const { idRole, idCategory, idContractHours, userName, password } = req.body;
    
        await pool.query('UPDATE app_user SET idRole = $2, idCategory = $3, idContractHours = $4, userName = $5, password=$6 WHERE idUser = $1',
         [id, idRole, idCategory, idContractHours, userName, password]);
    
         res.status(201).json({
            message: "Update user succesfully",
            body: {
                user: {idRole, idCategory, idContractHours, userName, password}
            }
         });
    } catch (error) {
        res.status(401).send({error: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        if (isExpToken(req)) {
            return res.status(401).send({error: 'Token expired'});
        }
        const id = req.params.id;
        const response = await pool.query('DELETE FROM app_user WHERE idUser = $1', [id]);
        res.json(`Deleted user ${id} `);
    } catch (error) {
        res.status(401).send({error: error.message});
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}