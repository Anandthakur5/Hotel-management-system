const express = require('express')
const router = express.Router();

const MenuItem = require('../models/Menu.js');

// POST ROUTE 
router.post('/', async(req, res) => {
    try {
        const data = req.body;

        const newMenu = await MenuItem.create(data);
        res.status(201).json({ message: "Created sucessfully", newMenu: newMenu});

    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message});
        console.log(error)
    }
})

// GET ROUTE
router.get('/', async(req, res) => {
    try {
        const getMenu = await MenuItem.find();
        res.status(201).json({ message: "Data fetched ", getMenu: getMenu});
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message});
        console.log(error)
    }
})

// GET ROUTE WIT VALIDATION
router.get('/:tasteType', async(req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if(tasteType == 'spicy' || tasteType == 'sour' || tasteType == 'sweet') {
            const response = await MenuItem.find({ taste:tasteType });
            res.status(201).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message});
        console.log(error)
    }
})

// UPDATE ROUTE 
router.put('/:id', async(req, res) => {
    try {
        const menuId = req.params.id;
        const updateddMenu = req.body;

        const data = await MenuItem.updateOne({_id: menuId}, updateddMenu);
        res.status(201).json({ message: "User updated sucessfully", data: updateddMenu});

    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message});
        console.log(error)
    }
});

// DELETE ROUTE 
router.delete('/:id', async(req, res) => {
    try {
        const menuId = req.params.id;

        const deleteMenu = await MenuItem.deleteOne({_id: menuId});
        res.status(201).json({ message: "Menu Deleted sucesssfully"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message});
        console.log(error)
    }
})

module.exports = router;