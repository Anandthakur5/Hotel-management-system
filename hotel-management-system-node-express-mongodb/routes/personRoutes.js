const express = require('express');
const router = express.Router();
const Person = require('../models/Person.js');
const {jwtAuthMiddleware, generateToken} = require('../jwt.js');

// POSTER ROUTE
router.post('/signup', async(req, res) => {
    try {
        const data = req.body;
        const newPerson = await Person.create(data);

        const payload = {
            id: newPerson.id,
            username: newPerson.username
        }

        const token = generateToken(payload);
        console.log("Token is: ", token);

        res.status(201).json({ message: "Created successfully ", person: newPerson, token: token});

    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message});
        console.log(error)
    }
})

// LOGIN ROUTE
router.post('/login', async(req, res) => {
    try {
        const {username, password} = req.body;

        const user = await Person.findOne({username: username});

        if( !user || !(await user.comparePassword(password))) {
            return res.status(401).json({error: "Invalid username or password"});
        }

        const payload = {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload);
        res.json({token})
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message});
        console.log(error)
    }
})

// GET ROUTE 
router.get('/', jwtAuthMiddleware, async(req, res) => {
    try {
        const getAllPersons = await Person.find();
        res.status(201).json({ message: "Here is All User", getAllPersons});
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message});
        console.log(error)
    }
})

// PARAMETERIZE ROUTE
router.get('/:workType', async(req, res) => {
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({work: workType});
            res.status(201).json(response);
        } else {
            res.status(404).json({ error: "Invalid workType"})
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message});
        console.log(error)
    }
})

// UPDATE ROUTE
router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id;
        const updateData = req.body;

        const data = await Person.updateOne({_id: personId}, updateData);
        res.status(201).json({ message: "User update successfully", data: updateData});

    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message});
        console.log(error)
    }
})

// DELETE ROUTE
router.delete('/:id', async(req, res) => {
    try {
        const personId = req.params.id;

        const deleteUser = await Person.deleteOne({ _id: personId});
        res.status(201).json({ message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message});
        console.log(error)
    }
})

module.exports = router;